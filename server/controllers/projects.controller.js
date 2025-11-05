import Project from '../models/projects.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
    try {
        // 빈 문자열 필드 제거
        const cleanedBody = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (value !== '' && value !== null && value !== undefined) {
                cleanedBody[key] = value;
            }
        }
        // 배열 필드 정규화 (문자열로 올 때 대비)
        const toArray = (v) =>
            Array.isArray(v)
                ? v
                : String(v || '')
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean);
        if ('technologies' in cleanedBody) cleanedBody.technologies = toArray(cleanedBody.technologies);
        if ('skills' in cleanedBody)       cleanedBody.skills       = toArray(cleanedBody.skills);
        
        const project = new Project(cleanedBody);
        await project.save();
        
        return res.status(200).json({
            message: "Successfully created the project!",
            project: project
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try {
        const projects = await Project.find()
            .sort({ _id: -1 })
            .lean();
        const normalized = (projects || []).map((p) => ({
            _id: p._id,
            title: p.title || '',
            time: typeof p.time === 'string' ? p.time : '',
            image: p.image || '',
            description: p.description || '',
            technologies: Array.isArray(p.technologies) ? p.technologies : [],
            skills: Array.isArray(p.skills) ? p.skills : [],
            role: p.role || '',
            github: p.github || '',
            liveDemo: p.liveDemo || '',
            problemLog: p.problemLog || '',
            testingLog: p.testingLog || ''
        }));
        res.json(normalized);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const projectByID = async (req, res, next, id) => {
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({
                error: "Project not found"
            });
        }
        req.profile = project;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve project"
        });
    }
};

const read = (req, res) => {
    const src = req.profile && typeof req.profile.toObject === 'function' ? req.profile.toObject() : req.profile || {};
    const normalized = {
        _id: src._id,
        title: src.title || '',
        time: typeof src.time === 'string' ? src.time : '',
        image: src.image || '',
        description: src.description || '',
        technologies: Array.isArray(src.technologies) ? src.technologies : [],
        skills: Array.isArray(src.skills) ? src.skills : [],
        role: src.role || '',
        github: src.github || '',
        liveDemo: src.liveDemo || '',
        problemLog: src.problemLog || '',
        testingLog: src.testingLog || ''
    };
    return res.json(normalized);
};

const update = async (req, res) => {
    try {
        // 빈 문자열 필드 제거
        const cleanedBody = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (value !== '' && value !== null && value !== undefined) {
                cleanedBody[key] = value;
            }
        }
        // 배열 필드 정규화 (문자열로 올 때 대비)
        const toArray = (v) =>
            Array.isArray(v)
                ? v
                : String(v || '')
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean);
        if ('technologies' in cleanedBody) cleanedBody.technologies = toArray(cleanedBody.technologies);
        if ('skills' in cleanedBody)       cleanedBody.skills       = toArray(cleanedBody.skills);
        
        let project = req.profile;
        project = extend(project, cleanedBody);
        await project.save();
        
        res.json(project);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const remove = async (req, res) => {
    try {
        const project = req.profile;
        const deletedProject = await project.deleteOne();
        res.json({
            message: 'Project deleted successfully',
            deletedProject: deletedProject
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const removeAll = async (req, res) => {
    try {
        await Project.deleteMany({});
        res.json({ 
            message: "All projects deleted successfully!" 
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { create, projectByID, read, list, remove, update, removeAll };
