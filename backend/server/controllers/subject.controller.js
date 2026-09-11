import {
    createSubject as createSubjectService,
    getSubjects as getSubjectsService,
    getSubjectById as getSubjectByIdService,
    updateSubject as updateSubjectService,
    deleteSubject as deleteSubjectService,
} from "../services/subject.service.js";

export const createSubject = async (
    req,
    res,
    next
) => {
    try {
        const subject =
            await createSubjectService(
                req.user.id,
                req.validated.body
            );

        res.status(201).json({
            success: true,
            message: "Subject created successfully",
            data: {
                subject,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getSubjects = async (
    req,
    res,
    next
) => {
    try {
        const subjects =
            await getSubjectsService(
                req.user.id
            );

        res.status(200).json({
            success: true,
            data: {
                subjects,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getSubjectById = async (
    req,
    res,
    next
) => {
    try {
        const subject =
            await getSubjectByIdService(
                req.user.id,
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: {
                subject,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const updateSubject = async (
    req,
    res,
    next
) => {
    try {
        const subject =
            await updateSubjectService(
                req.user.id,
                req.params.id,
                req.validated.body
            );

        res.status(200).json({
            success: true,
            message: "Subject updated successfully",
            data: {
                subject,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSubject = async (
    req,
    res,
    next
) => {
    try {
        await deleteSubjectService(
            req.user.id,
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Subject deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};