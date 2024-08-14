

export interface IProjectModal {
    isEdit ?: boolean,
    title ?: string ,
    description ?: string ,
    handleEditSubmit ?: Function ,
    handleAddSubmit ?: Function   ,
    handleCloseModal ?:() => void ; 
}