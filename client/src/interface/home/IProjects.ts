export interface IProjects {
    projects : IProject[],
    handleEditClick : (data: IProject) => void ,
    handleDeleteProject :  (data: string) => void

}
interface IProject {
    _id : string ,
    title : string ,
    description : string
}