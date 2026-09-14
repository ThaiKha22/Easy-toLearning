import {
    getMyProfile as getMyProfileService,
    updateMyProfile as updateMyProfileService,
    updateLearningPreferences as updateLearningPreferencesService,
    updateNotificationSettings as updateNotificationSettingsService,
    updateAppearance as updateAppearanceService,
    changePassword as changePasswordService,
} from "../services/user.service.js";

export const getMyProfile = async (
    req,
    res,
    next
) => {
    try {
        const user =
            await getMyProfileService(
                req.user.id
            );

        res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
export const updateMyProfile = async (
    req,
    res,
    next
) => {
    try {
        const user =
            await updateMyProfileService(
                req.user.id,
                req.validated.body
            );

        res.status(200).json({
            success: true,
            message:
                "Profile updated successfully",
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
export const updateNotificationSettings =
    async (req, res, next) => {
        try {
            const user =
                await updateNotificationSettingsService(
                    req.user.id,
                    req.validated.body
                );

            res.status(200).json({
                success: true,
                message:
                    "Notification settings updated successfully",
                data: { user },
            });
        } catch (error) {
            next(error);
        }
    };
export const updateAppearance =
    async (req, res, next) => {
        try {
            const user =
                await updateAppearanceService(
                    req.user.id,
                    req.validated.body
                );

            res.status(200).json({
                success: true,
                message:
                    "Appearance updated successfully",
                data: { user },
            });
        } catch (error) {
            next(error);
        }
    };
export const changePassword = async (
    req,
    res,
    next
) => {
    try {
        await changePasswordService(
            req.user.id,
            req.validated.body.currentPassword,
            req.validated.body.newPassword
        );

        res.status(200).json({
            success: true,
            message:
                "Password changed successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const updateLearningPreferences =
    async (req, res, next) => {
        try {
            const user =
                await updateLearningPreferencesService(
                    req.user.id,
                    req.validated.body
                );

            res.status(200).json({
                success: true,
                message:
                    "Learning preferences updated successfully",
                data: { user },
            });
        } catch (error) {
            next(error);
        }
    };