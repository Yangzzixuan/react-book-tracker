import type {Item} from "../type"

interface ItemCardProps{
    item:Item,
    onDelete:()=>void,
    onEdit:()=>void,
}
function getTypeLabel(type:string):string{
    let text:string=type
    if(type==="book"){
        text="书籍"
    }else if(type==="movie"){
        text="电影"
    }else if(type==="anime"){
        text="动漫"
    }else if(type==="game"){
        text="游戏"
    }
    return text
}
function getStatusLabel(item:Item):string{
    let text:string=item.status
    if(item.status==="want" && item.type==="game"){
        text="想玩"
    }else if(item.status==="want" ){
        text="想看"
    }else if(item.status==="doing" && item.type==="game"){
        text="在玩"
    }else if(item.status==="doing"){
        text="在看"
    }else if(item.status==="done" && item.type==="game"){
        text="玩过"
    }else if(item.status==="done"){
        text="看过"
    }
    return text
}
function ItemCard(props:ItemCardProps){
    return(
        <div className='itemCard'>
            <div className='coverPage'>
                {props.item.coverUrl &&(
                    <img
                        src={props.item.coverUrl}
                        alt={props.item.title}
                        className="itemCover"/>
                )}
            </div>
            <div className='itemTitle'>
                <h2>{props.item.title}</h2>
            </div>
            <div className='itemMeta'>
                <p>{getTypeLabel(props.item.type)}</p>
                <p>{getStatusLabel(props.item)}</p>
                <p>评分: {props.item.rating}/5</p>
                <p>{props.item.year}</p>
            </div>
            <div className='itemNote'>
                {props.item.note && <p>{props.item.note}</p>}
            </div>
            <div className='deleteButton'>
                <button onClick={props.onDelete}>Delete</button>
            </div>
            <div className="editButton">
                <button onClick={props.onEdit}>Edit</button>
            </div>
        </div>
    )
}
export default ItemCard