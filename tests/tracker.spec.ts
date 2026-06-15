import { expect, test } from "@playwright/test";
import { Buffer } from "node:buffer";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.reload();
});

test("shows the tracker home page", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Book Tracker" })).toBeVisible();
  await expect(page.getByPlaceholder("input searching")).toBeVisible();
  await expect(page.getByRole("button", { name: "Export JSON" })).toBeVisible();
});

test("adds a new item", async ({ page }) => {
  const form = page.locator(".addArea");

  await page.getByPlaceholder("title").fill("Hades");
  await form.locator("select").nth(0).selectOption("game");
  await form.locator("select").nth(1).selectOption("done");
  await form.locator('input[type="number"]').nth(0).fill("2020");
  await page.getByPlaceholder("note").fill("Fast action game");
  await form.locator('input[type="number"]').nth(1).fill("5");
  await page.getByPlaceholder("cover image url").fill("/covers/hades.png");
  await page.getByRole("button", { name: "add" }).click();

  await expect(page.getByRole("heading", { name: "Hades" })).toBeVisible();
  await expect(page.getByText("Fast action game")).toBeVisible();
});

test("searches items by title", async ({ page }) => {
  await page.getByPlaceholder("input searching").fill("Cyberpunk");

  await expect(page.getByRole("heading", { name: "Cyberpunk" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "EVA" })).not.toBeVisible();
});

test("filters items by type", async ({ page }) => {
  await page.locator(".filterArea select").nth(0).selectOption("game");

  await expect(page.getByRole("heading", { name: "Cyberpunk" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "EVA" })).not.toBeVisible();
});

test("filters items by status", async ({ page }) => {
  const form = page.locator(".addArea");

  await page.getByPlaceholder("title").fill("Hades");
  await form.locator("select").nth(0).selectOption("game");
  await form.locator("select").nth(1).selectOption("want");
  await page.getByRole("button", { name: "add" }).click();

  await page.locator(".filterArea select").nth(1).selectOption("want");

  await expect(page.getByRole("heading", { name: "Hades" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cyberpunk" })).not.toBeVisible();
});

test("edits an existing item", async ({ page }) => {
  await page
    .locator(".itemCard")
    .filter({ has: page.getByRole("heading", { name: "Cyberpunk" }) })
    .getByRole("button", { name: "Edit" })
    .click();
  await page.getByPlaceholder("title").fill("Cyberpunk 2077");
  await page.getByRole("button", { name: "save" }).click();

  await expect(page.getByRole("heading", { name: "Cyberpunk 2077" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cyberpunk", exact: true })).not.toBeVisible();
});

test("deletes an item", async ({ page }) => {
  await page
    .locator(".itemCard")
    .filter({ has: page.getByRole("heading", { name: "EVA" }) })
    .getByRole("button", { name: "Delete" })
    .click();

  await expect(page.getByRole("heading", { name: "EVA" })).not.toBeVisible();
});

test("sorts items by year", async ({ page }) => {
  await page.locator(".filterArea select").nth(2).selectOption("year");
  const firstCard = page.locator(".itemCard").first();
  await expect(firstCard).toContainText("Cyberpunk");
});

test("keeps added items after reload", async ({ page }) => {
  await page.getByPlaceholder("title").fill("Reload Test");
  await page.getByRole("button", { name: "add" }).click();

  await expect(page.getByRole("heading", { name: "Reload Test" })).toBeVisible();
  await page.waitForFunction(() =>
    localStorage.getItem("react-book-tracker-items")?.includes("Reload Test"),
  );
  await page.reload();

  await expect(page.getByRole("heading", { name: "Reload Test" })).toBeVisible();
});

test("imports items from a JSON file", async ({ page }) => {
  const importedItems = [
    {
      id: 100,
      title: "Imported Book",
      type: "book",
      status: "want",
      rating: 4,
      year: 2026,
      coverUrl: "",
      note: "Imported from JSON",
    },
  ];

  await page.locator('input[type="file"]').setInputFiles({
    name: "items.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(importedItems)),
  });

  await expect(page.getByRole("heading", { name: "Imported Book" })).toBeVisible();
  await expect(page.getByText("Imported from JSON")).toBeVisible();
});
