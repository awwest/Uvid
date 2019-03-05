
import React from "react";

function Pagination(props){
    return (
        <ul className="pagination pagination-lg mt-5 justify-content-center">
            {props.shouldShowPrev && 
                <li className="page-item">
                    <button type="button" className="page-link" onClick={props.prevPage} name="prev">&laquo;</button>
                </li>
            }
            <li className="page-item active">
                <button type="button" className="page-link" href="#">{props.page}</button>
            </li> 
            {props.shouldShowNext && 
                <li className="page-item">
                    <button type="button" className="page-link" href="#" onClick={props.nextPage} name="next">&raquo;</button>
                </li>
            }  
        </ul> 
    );
}

export default Pagination;



