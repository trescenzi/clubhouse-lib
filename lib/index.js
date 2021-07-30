"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var TokenRequestFactory_1 = require("./TokenRequestFactory");
var FetchRequestPerformer_1 = require("./FetchRequestPerformer");
var FetchRequestParser_1 = require("./FetchRequestParser");
__exportStar(require("./types"), exports);
var API_BASE_URL = 'https://api.clubhouse.io';
var API_VERSION = 'v3';
var defaultConfig = {
    baseURL: API_BASE_URL,
    version: API_VERSION,
};
/**
 * @class Client
 */
var Client = /** @class */ (function () {
    function Client(requestFactory, requestPerformer, responseParser) {
        this.requestFactory = requestFactory;
        this.requestPerformer = requestPerformer;
        this.responseParser = responseParser;
    }
    /** */
    Client.create = function (token, config) {
        if (config === void 0) { config = defaultConfig; }
        var baseURL = config.baseURL, version = config.version;
        return new Client(new TokenRequestFactory_1.default(token, baseURL, version), new FetchRequestPerformer_1.default(), new FetchRequestParser_1.default());
    };
    Client.prototype.listResource = function (uri, params) {
        return this.getResource(uri, params);
    };
    Client.prototype.getResource = function (uri, params) {
        var request = params
            ? this.requestFactory.createRequest(uri, 'GET', params)
            : this.requestFactory.createRequest(uri);
        return this.requestPerformer
            .performRequest(request)
            .then(this.responseParser.parseResponse);
    };
    Client.prototype.createResource = function (uri, params) {
        var request = this.requestFactory.createRequest(uri, 'POST', params);
        return this.requestPerformer
            .performRequest(request)
            .then(this.responseParser.parseResponse);
    };
    Client.prototype.updateResource = function (uri, params) {
        var request = this.requestFactory.createRequest(uri, 'PUT', params);
        return this.requestPerformer
            .performRequest(request)
            .then(this.responseParser.parseResponse);
    };
    Client.prototype.deleteResource = function (uri, params) {
        var request = this.requestFactory.createRequest(uri, 'DELETE', params);
        return this.requestPerformer
            .performRequest(request)
            .then(this.responseParser.parseResponse);
    };
    /** */
    Client.prototype.listMembers = function () {
        return this.listResource('members');
    };
    /** */
    Client.prototype.getMember = function (userID) {
        return this.getResource("members/" + userID);
    };
    /** */
    Client.prototype.getCurrentMember = function () {
        return this.getResource('member');
    };
    /** Not Available through the API */
    Client.prototype.getCurrentUser = function () {
        return this.getResource('user');
    };
    /** */
    Client.prototype.listProjects = function () {
        return this.listResource('projects');
    };
    /** */
    Client.prototype.getProject = function (id) {
        return this.getResource("projects/" + id);
    };
    /** */
    Client.prototype.createProject = function (params) {
        return this.createResource('projects', params);
    };
    /** */
    Client.prototype.updateProject = function (id, params) {
        return this.updateResource("projects/" + id, params);
    };
    /** */
    Client.prototype.deleteProject = function (id) {
        return this.deleteResource("projects/" + id);
    };
    /** */
    Client.prototype.listEpics = function () {
        return this.listResource('epics');
    };
    /** */
    Client.prototype.getEpic = function (epicID) {
        return this.getResource("epics/" + epicID);
    };
    /** */
    Client.prototype.createEpic = function (params) {
        return this.createResource('epics', params);
    };
    /** */
    Client.prototype.updateEpic = function (epicID, params) {
        return this.updateResource("epics/" + epicID, params);
    };
    /** */
    Client.prototype.deleteEpic = function (epicID) {
        return this.deleteResource("epics/" + epicID);
    };
    /** */
    Client.prototype.addReaction = function (storyId, commentId, emoji) {
        return this.createResource("stories/" + storyId + "/comments/" + commentId + "/reactions", {
            emoji: emoji,
        });
    };
    /** */
    Client.prototype.deleteReaction = function (storyId, commentId, emoji) {
        return this.deleteResource("stories/" + storyId + "/comments/" + commentId + "/reactions", {
            emoji: emoji,
        });
    };
    /** */
    Client.prototype.listStories = function (projectID, includesDescription) {
        return this.listResource("projects/" + projectID + "/stories", {
            includes_description: Boolean(includesDescription),
        });
    };
    /** */
    Client.prototype.searchStories = function (query, pageSize) {
        var _this = this;
        var processResult = function (result) {
            if (result.next) {
                return __assign(__assign({}, result), { fetchNext: function () { return _this.getResource(result.next).then(processResult); } });
            }
            return result;
        };
        return this.getResource("search/stories", {
            query: query,
            page_size: pageSize || 25,
        }).then(processResult);
    };
    /** */
    Client.prototype.createStory = function (params) {
        return this.createResource('stories', params);
    };
    /** */
    Client.prototype.getStory = function (storyID) {
        return this.getResource("stories/" + storyID);
    };
    /** */
    Client.prototype.getStoryHistory = function (storyID) {
        return this.getResource("stories/" + storyID + "/history");
    };
    /** */
    Client.prototype.updateStory = function (storyID, params) {
        return this.updateResource("stories/" + storyID, params);
    };
    /** */
    Client.prototype.deleteStory = function (storyID) {
        return this.deleteResource("stories/" + storyID);
    };
    /** */
    Client.prototype.createStoryComment = function (storyID, text) {
        return this.createResource("stories/" + storyID + "/comments", { text: text });
    };
    /** */
    Client.prototype.deleteStoryComment = function (storyID, commentID) {
        return this.deleteResource("stories/" + storyID + "/comments/" + commentID);
    };
    /** */
    Client.prototype.updateStoryComment = function (storyID, commentID, text) {
        return this.updateResource("stories/" + storyID + "/comments/" + commentID, {
            text: text,
        });
    };
    /** */
    Client.prototype.listTasks = function (storyID) {
        return this.listResource("stories/" + storyID + "/tasks");
    };
    /** */
    Client.prototype.createTask = function (storyID, params) {
        return this.createResource("stories/" + storyID + "/tasks", params);
    };
    /** */
    Client.prototype.getTask = function (storyID, taskID) {
        return this.getResource("stories/" + storyID + "/tasks/" + taskID);
    };
    /** */
    Client.prototype.updateTask = function (storyID, taskID, params) {
        return this.updateResource("stories/" + storyID + "/tasks/" + taskID, params);
    };
    /** */
    Client.prototype.deleteTask = function (storyID, taskID) {
        return this.deleteResource("stories/" + storyID + "/tasks/" + taskID);
    };
    /** */
    Client.prototype.listWorkflows = function () {
        return this.listResource('workflows');
    };
    /** */
    Client.prototype.createStoryLink = function (params) {
        return this.createResource('story-links', params);
    };
    /** */
    Client.prototype.getStoryLink = function (storyLinkID) {
        return this.getResource("story-links/" + storyLinkID);
    };
    /** */
    Client.prototype.deleteStoryLink = function (storyLinkID) {
        return this.deleteResource("story-links/" + storyLinkID);
    };
    /** */
    Client.prototype.listFiles = function () {
        return this.listResource('files');
    };
    /** */
    Client.prototype.updateFile = function (fileID, params) {
        return this.updateResource("files/" + fileID, params);
    };
    /** */
    Client.prototype.deleteFile = function (fileID) {
        return this.deleteResource("files/" + fileID);
    };
    /** */
    Client.prototype.listLinkedFiles = function () {
        return this.listResource('linked-files');
    };
    /** */
    Client.prototype.createLinkedFile = function (params) {
        return this.createResource('linked-files', params);
    };
    /** */
    Client.prototype.updateLinkedFile = function (linkedFileID, params) {
        return this.updateResource("linked-files/" + linkedFileID, params);
    };
    /** */
    Client.prototype.deleteLinkedFile = function (linkedFileID) {
        return this.deleteResource("linked-files/" + linkedFileID);
    };
    /** */
    Client.prototype.createLabel = function (name, color) {
        return this.createResource("labels", { name: name, color: color });
    };
    /** */
    Client.prototype.listLabels = function () {
        return this.listResource('labels');
    };
    /** */
    Client.prototype.listTeams = function () {
        return this.listResource('teams');
    };
    /** */
    Client.prototype.getTeam = function (teamID) {
        return this.getResource("teams/" + teamID);
    };
    /** */
    Client.prototype.listIterations = function () {
        return this.listResource("iterations");
    };
    /** */
    Client.prototype.createIteration = function (params) {
        return this.createResource("iterations", params);
    };
    /** */
    Client.prototype.getIteration = function (iterationID) {
        return this.getResource("iterations/" + iterationID);
    };
    /** */
    Client.prototype.updateIteration = function (iterationID, params) {
        return this.updateResource("iterations/" + iterationID, params);
    };
    /** */
    Client.prototype.deleteIteration = function (iterationID) {
        return this.deleteResource("iterations/" + iterationID);
    };
    return Client;
}());
exports.default = Client;
// For CommonJS default export support
module.exports = Client;
module.exports.default = Client;
