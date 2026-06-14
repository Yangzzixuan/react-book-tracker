
interface AddFormProps{
    title:string
    setTitle:(value:string)=>void
    type:string
    setType:(value:string)=>void
    status:string
    setStatus:(value:string)=>void
    year:number
    setYear:(value:number)=>void
    note:string
    setNote:(value:string)=>void
    rating:number
    setRating:(value:number)=>void
    coverUrl:string
    setCoverUrl:(value:string)=>void
    onAdd:()=>void
    isEditing:boolean
    onCancelEdit:()=>void
}



function AddForm(props:AddFormProps){
    return (
        <div className='addArea'>
                        <input
                            value={props.title}
                            onChange={(event)=>props.setTitle(event.target.value)}
                            placeholder='title'/>
                        <select
                            value={props.type}
                            onChange={(event)=>props.setType(event.target.value)}
                        >
                            <option value="book">Book</option>
                            <option value="movie">Movie</option>
                            <option value="game">Game</option>
                            <option value="anime">Anime</option>
                        </select>
                        <select
                            value={props.status}
                            onChange={(event)=>props.setStatus(event.target.value)}
                        >
                            <option value="want">want</option>
                            <option value="doing">doing</option>
                            <option value="done">done</option>
                        </select>
                        <input type="number"
                            value={props.year}
                            onChange={(event)=>props.setYear(Number(event.target.value))}/>
                        <input value={props.note}
                            onChange={(event)=>props.setNote(event.target.value)}
                            placeholder='note'/>
                        <input type="number"
                            value={props.rating}
                            min={1}
                            max={5}
                            onChange={(event)=>props.setRating(Number(event.target.value))}/>
                        <input value={props.coverUrl}
                            onChange={(event)=>props.setCoverUrl(event.target.value)}
                            placeholder='cover image url'/>
                        <button
                            onClick={props.onAdd}>{props.isEditing ? "save":"add"}</button>
                        {props.isEditing && (
                            <button onClick={props.onCancelEdit}>cancel</button>
                        )}
                    </div>
    )
}
export default AddForm