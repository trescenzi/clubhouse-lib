import { Comment, CreateTaskParams, CurrentMember, Epic, EpicChange, File, FileChange, ID, Iteration, IterationChange, Label, LinkedFile, LinkedFileChange, Member, Project, ProjectChange, RequestFactory, RequestPerformer, ResponseParser, Story, StoryChange, StoryHistories, StoryLink, StoryLinkChange, StorySearchResult, Task, Team, UpdateTaskParams, Workflow } from './types';
export * from './types';
/** */
declare type ClientConfig = {
    baseURL: string;
    version: string;
};
/**
 * @class Client
 */
declare class Client<RequestType, ResponseType> {
    requestFactory: RequestFactory<RequestType>;
    requestPerformer: RequestPerformer<RequestType, ResponseType>;
    responseParser: ResponseParser<ResponseType>;
    constructor(requestFactory: RequestFactory<RequestType>, requestPerformer: RequestPerformer<RequestType, ResponseType>, responseParser: ResponseParser<ResponseType>);
    /** */
    static create(token: string, config?: ClientConfig): Client<RequestInfo, Response>;
    listResource<T>(uri: string, params?: Record<string, any> | null | undefined): Promise<Array<T>>;
    getResource<T>(uri: string, params?: Record<string, any> | null | undefined): Promise<T>;
    createResource<T>(uri: string, params: Record<string, any>): Promise<T>;
    updateResource<T>(uri: string, params: Record<string, any>): Promise<T>;
    deleteResource<T>(uri: string, params?: Record<string, any>): Promise<T>;
    /** */
    listMembers(): Promise<Array<Member>>;
    /** */
    getMember(userID: ID): Promise<Member>;
    /** */
    getCurrentMember(): Promise<CurrentMember>;
    /** Not Available through the API */
    getCurrentUser(): Promise<Member>;
    /** */
    listProjects(): Promise<Array<Project>>;
    /** */
    getProject(id: ID): Promise<Project>;
    /** */
    createProject(params: ProjectChange): Promise<Project>;
    /** */
    updateProject(id: ID, params: ProjectChange): Promise<Project>;
    /** */
    deleteProject(id: ID): Promise<Record<string, unknown>>;
    /** */
    listEpics(): Promise<Array<Epic>>;
    /** */
    getEpic(epicID: ID): Promise<Epic>;
    /** */
    createEpic(params: EpicChange): Promise<Epic>;
    /** */
    updateEpic(epicID: ID, params: EpicChange): Promise<Epic>;
    /** */
    deleteEpic(epicID: ID): Promise<Record<string, unknown>>;
    /** */
    addReaction(storyId: ID, commentId: ID, emoji: string): Promise<void>;
    /** */
    deleteReaction(storyId: ID, commentId: ID, emoji: string): Promise<void>;
    /** */
    listStories(projectID: ID, includesDescription?: boolean): Promise<Array<Story>>;
    /** */
    searchStories(query: string, pageSize?: number): Promise<StorySearchResult>;
    /** */
    createStory(params: StoryChange): Promise<Story>;
    /** */
    getStory(storyID: ID): Promise<Story>;
    /** */
    getStoryHistory(storyID: ID): Promise<StoryHistories>;
    /** */
    updateStory(storyID: ID, params: StoryChange): Promise<Story>;
    /** */
    deleteStory(storyID: ID): Promise<Record<string, unknown>>;
    /** */
    createStoryComment(storyID: ID, text: string): Promise<Comment>;
    /** */
    deleteStoryComment(storyID: ID, commentID: ID): Promise<Record<string, unknown>>;
    /** */
    updateStoryComment(storyID: ID, commentID: ID, text: string): Promise<Comment>;
    /** */
    listTasks(storyID: ID): Promise<Array<Task>>;
    /** */
    createTask(storyID: ID, params: CreateTaskParams): Promise<Task>;
    /** */
    getTask(storyID: ID, taskID: ID): Promise<Task>;
    /** */
    updateTask(storyID: ID, taskID: ID, params: UpdateTaskParams): Promise<Task>;
    /** */
    deleteTask(storyID: ID, taskID: ID): Promise<Record<string, unknown>>;
    /** */
    listWorkflows(): Promise<Array<Workflow>>;
    /** */
    createStoryLink(params: StoryLinkChange): Promise<StoryLink>;
    /** */
    getStoryLink(storyLinkID: ID): Promise<StoryLink>;
    /** */
    deleteStoryLink(storyLinkID: ID): Promise<Record<string, unknown>>;
    /** */
    listFiles(): Promise<Array<File>>;
    /** */
    updateFile(fileID: ID, params: FileChange): Promise<File>;
    /** */
    deleteFile(fileID: ID): Promise<Record<string, unknown>>;
    /** */
    listLinkedFiles(): Promise<Array<LinkedFile>>;
    /** */
    createLinkedFile(params: LinkedFileChange): Promise<LinkedFile>;
    /** */
    updateLinkedFile(linkedFileID: ID, params: LinkedFileChange): Promise<LinkedFile>;
    /** */
    deleteLinkedFile(linkedFileID: ID): Promise<Record<string, unknown>>;
    /** */
    createLabel(name: string, color: string): Promise<any>;
    /** */
    listLabels(): Promise<Array<Label>>;
    /** */
    listTeams(): Promise<Array<Team>>;
    /** */
    getTeam(teamID: ID): Promise<Team>;
    /** */
    listIterations(): Promise<Array<Iteration>>;
    /** */
    createIteration(params: IterationChange): Promise<Iteration>;
    /** */
    getIteration(iterationID: ID): Promise<Iteration>;
    /** */
    updateIteration(iterationID: ID, params: IterationChange): Promise<Iteration>;
    /** */
    deleteIteration(iterationID: ID): Promise<Record<string, unknown>>;
}
export default Client;
