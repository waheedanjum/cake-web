import React, { useState, useEffect } from 'react'
import CreateOrEditCake from './CreateOrEditCake';
import { Modal, Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import SingleCake from './SingleCake';
import './cake.css'
import 'react-toastify/dist/ReactToastify.css';




const Cake = () => {
    const [data, setData] = useState(null);
    const [showForm, setShowForm] = useState(false)
 
    useEffect(() => {
           getAllCakes()
    }, []);

    const getAllCakes = async() => {
        const response = await fetch('/api/cakes');
        const body = await response.json();
        if (body && body.data) setData(body.data)
    }
    const onEdit = async(id, cakeData) => {
        try {
            const response = await fetch(`/api/cakes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cakeData),
            });
            const body = await response.json();
            if (body && body.data) {
                toast.success(body.message)
                setData(body.data)
                return true
            } else if (body.error) {
                toast.error(body.error)
                return false
            }
        } catch(err) {
            toast.error(err)
        }
    }
   
    const onDelete = async(id) => {
        try {
            const response = await fetch(`/api/cakes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const body = await response.json();
            if (body && body.data) {
                toast.success(body.message)
                setData(body.data)
                return true
            } else if (body.error) {
                toast.error(body.error)
                return false
            }
        } catch(err) {
            toast.error(err)
        }
    }
   
    const onCreate = async(cakeData) => {
        try {
            const response = await fetch('/api/cakes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cakeData),
            });
            const body = await response.json();
            if (body && body.data) {
                toast.success(body.message)
                setData(body.data)
                setShowForm(false)
            } else if (body.error) {
                toast.error(body.error)
            }
        } catch(err) {
            toast.error(err)
        }
    }
    const handleClose = () => setShowForm(false);
    const handleShow = () => setShowForm(true);

    return (
     <div>
        <div className="container-fluid">
            <div className="page-title">
				<div className="row mt-3">
					<div className="col-sm-6">
						<h4 >My Cakes App</h4>
					</div>
					<div className="col-sm-6">
                        <Button variant="primary" onClick={handleShow}>
                            <i className="fa fa-plus"></i><span>Add New Cake</span>
                        </Button>
                    </div>
				</div>
			</div>
           {(data && data.length) ?  <div className="row d-flex justify-content-space-between align-items-stretch pl-2">
                {data.map(cake => {
                    return (
                      <SingleCake key={cake.id} cakeData={cake} onEdit={onEdit} onDelete={onDelete}></SingleCake>
                    );
                })}
            </div> : <div className="text-center">No Cakes Found</div>}
            <Modal
                show={showForm}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Cake</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <><CreateOrEditCake onCreate={onCreate} defaultID = {(data && data.length) ? (data[data.length - 1].id + 1) : 1}/></>
                </Modal.Body>
            </Modal>
           
        </div>
        <ToastContainer
                position="bottom-center"
                autoClose={5000} 
                closeOnClick
                hideProgressBar
                rtl={false}
              
            />
    </div>
    );
}
export default Cake
