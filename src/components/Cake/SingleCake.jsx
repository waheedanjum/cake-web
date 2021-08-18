import React, {useEffect, useState} from 'react'
import { Modal } from 'react-bootstrap'
import CreateOrEditCake from './CreateOrEditCake'

const SingleCake = ({cakeData, onEdit, onDelete}) => {
    const [data, setData] = useState(cakeData)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false)

    useEffect(() => {
        setData(cakeData)
    }, [cakeData])

    const handleClose = () => setShowEditForm(false);
    const handleShow = () => setShowEditForm(true);
    const handleDeleteClose = () => setShowDeletePopup(false);
    const handleDeleteShow = () => setShowDeletePopup(true);
    
    const onEditData = async(updatedData) => {
        const res = await onEdit(cakeData.id, updatedData)
        if (res) setShowEditForm(false)
    }
   
    const displayYumFactor = (yumfactor) => {
        let content = [];
        for (let i = 0; i < 5; i++) {
          content.push(<span key={`yum-${i}`} className={i < yumfactor ? `fa fa-star checked` : `fa fa-star-o`}></span>);
        }
       
        return content;
      };

    return (
        <>
            {data && <div className=" p-3 m-3">
                <div className="card text-center" style={{ width: "25rem",height: "100%"}}>
                    <img className="card-img-top" alt="" src={data.url} style={{ height: "300px" }} />
                    <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text" style={{ fontSize: "12px" }}>{data.comment}</p>
                        <p className="card-text">Yum Factor : {displayYumFactor(data.yumfactor)}</p>
                    </div>
                    <div className="row p-3 justify-content-center">
                        <button onClick={handleShow} className="col-4 m-2 p-2 btn btn-primary" >Edit</button>
                        <button onClick={handleDeleteShow} className="col-4 m-2 p-2 btn btn-danger">Delete</button>
                    </div>
                          
                </div>

            </div>}
            <Modal
                show={showEditForm}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Cake</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <><CreateOrEditCake data={cakeData} isEdit={true} onCreate={onEditData}/></>
                </Modal.Body>
            </Modal>
            <Modal
                show={showDeletePopup}
                onHide={handleDeleteClose}
                backdrop="static"
                >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Cake</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <> 
                    <p> Are you sure you want to delete this cake? </p>
                        <div class="col-12 text-right">
                            <button className="btn btn-danger" onClick={() => onDelete(data.id)}>Delete</button>
                        </div>
                   
                    </>
                </Modal.Body>
            </Modal>
           
        </>
    )
}

export default SingleCake
