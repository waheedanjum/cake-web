import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Button, Form, Spinner} from 'react-bootstrap';
import './cake.css';


const CreateOrEditCake = ({ showForm, onCreate, data, isEdit, defaultID}) => {
    const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm();
    const [imageUrl, setImageUrl] = useState(null)
    const [isImageInvalid, setIsImageInvalid] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const [dataToEdit, setDataToEdit] =  useState(data)
   
    const onSubmit = async (data) => {
        if (defaultID && !isEdit && !data.id ) {
            data.id = defaultID
        }
        if (isImageInvalid) {
            setError("url", { type: "invalid", message: "Image URL is invalid" })
         }
          else {
            setShowLoader(true)
            await onCreate(data)
            setShowLoader(false)
        }
    };
    useEffect(() => {
        setDataToEdit(data)
        data && setImageUrl(data.url)
    }, [data])

    useEffect(() => {
        if (!isEdit) setValue("id", defaultID)
    }, [defaultID, isEdit])
    
   
   
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicID">
                    <Form.Label>Cake ID</Form.Label>
                    <Form.Control
                        name="id"
                        disabled={true}
                        {...register('id', { required: "Required", pattern: {value: /^[0-9\b]+$/, message: "ID can only be a number"}})}
                        placeholder="Enter Cake ID"
                        className={`${errors.id ? "invalid" : ""}`}
                        defaultValue = {(isEdit && dataToEdit.id) || ''}

                    />
                    {errors.id && <Form.Text className="form-input-error">
                        {errors.id.message}
                    </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Cake Name</Form.Label>
                    <Form.Control
                        name="name"
                        disabled={showLoader}
                        {...register('name', { required: "Required", maxLength: { value: 30, message: "Name can only be 30 characters long" } })}
                        placeholder="Enter Cake Name"
                        className={`${errors.name ? "invalid" : ""}`}
                        defaultValue = {(isEdit && dataToEdit.name) || ''}
                    />
                    {errors.name && <Form.Text className="form-input-error">
                        {errors.name.message}
                    </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicComment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                        name="comment"
                        disabled={showLoader}
                        {...register('comment', { required: "Required", maxLength: { value: 200, message: "Comment can only be 200 characters long" } })}
                        placeholder="Add Comment"
                        className={`${errors.comment ? "invalid" : ""}`}
                        defaultValue = {(isEdit && dataToEdit.comment) || ''}
                    />
                    {errors.comment && <Form.Text className="form-input-error">
                        {errors.comment.message}
                    </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicYum">
                    <Form.Label>Yum Factor</Form.Label>
                    <Form.Control
                        name="yumfactor"
                        disabled={showLoader}
                        type="number"
                        {...register('yumfactor', { required: "Required", min: {value: 1, message: "Yum Factor should be between 1-5"}, max: {value: 5, message: "Yum Factor should be between 1-5"}})}
                        placeholder="Add Yum Factor (1-5)"
                        className={`${errors.yumfactor ? "invalid" : ""}`}
                        defaultValue = {(isEdit && dataToEdit.yumfactor) || ''}
                    />
                    {errors.yumfactor && <Form.Text className="form-input-error">
                        {errors.yumfactor.message}
                    </Form.Text>}
                </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicImageUrl">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control
                        name="url"
                        type="url"
                        disabled={showLoader}
                        {...register('url', { required: "Required"})}
                        onChange={(event) => 
                            {setImageUrl(null)
                            setImageUrl(event.target.value)}
                        }
                        placeholder="https://"
                        className={`${errors.url ? "invalid" : ""}`}
                        defaultValue = {(isEdit && dataToEdit.url) || ''}
                    />
                    {errors.url && <Form.Text className="form-input-error">
                        {errors.url.message}
                    </Form.Text>}
                    {isImageInvalid && <Form.Text className="form-input-error">
                        Please enter a valid image url
                    </Form.Text>}
                    {imageUrl &&
                        <div style={{ width: "100%", textAlign: "center" }}><img className="mx-auto my-2" style={{ height: "100px", width: "100px" }}
                            onError={() => setIsImageInvalid(true)}
                            onLoad={() => setIsImageInvalid(false)}
                            src={imageUrl}>
                        </img>
                        </div>
                
                    }
                </Form.Group>
                <Button className="col-12" variant="primary" type="submit">
                   {!showLoader ? !isEdit ? "Add Cake" : "Update Cake" : <Spinner animation="border"/>}
                </Button>
            </Form>
        </>
    );
}

export default CreateOrEditCake
