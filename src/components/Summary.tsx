interface SummaryProps{
    totalCount:number;
    showingCount:number
}
function Summary(props:SummaryProps){
    return(
        <div className="summaryArea">
            <p>total:{props.totalCount}/ showing:{props.showingCount}</p>
        </div>
    )
}
export default Summary