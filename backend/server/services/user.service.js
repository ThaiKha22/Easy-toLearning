import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";

export const getMyProfile = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(
            "User not found",
            404
        );
    }

    return user;
};

export const updateMyProfile = async (
    userId,
    data
) => {
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: data,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!user) {
        throw new AppError(
            "User not found",
            404
        );
    }

    return user;
};

export const updateLearningPreferences =
    async (userId, data) => {
        const updateData = {};

        if (
            data.dailyStudyGoal !== undefined
        ) {
            updateData[
                "learningPreferences.dailyStudyGoal"
            ] = data.dailyStudyGoal;
        }

        if (
            data.preferredStudyTime !== undefined
        ) {
            updateData[
                "learningPreferences.preferredStudyTime"
            ] = data.preferredStudyTime;
        }

        if (
            data.difficulty !== undefined
        ) {
            updateData[
                "learningPreferences.difficulty"
            ] = data.difficulty;
        }

        if (data.language !== undefined) {
            updateData[
                "learningPreferences.language"
            ] = data.language;
        }

        const user =
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: updateData,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!user) {
            throw new AppError(
                "User not found",
                404
            );
        }

        return user;
    };

export const updateNotificationSettings =
    async (userId, data) => {
        const updateData = {};

        if (
            data.studyReminders !== undefined
        ) {
            updateData[
                "notificationSettings.studyReminders"
            ] = data.studyReminders;
        }

        if (
            data.quizReminders !== undefined
        ) {
            updateData[
                "notificationSettings.quizReminders"
            ] = data.quizReminders;
        }

        if (
            data.aiRecommendations !== undefined
        ) {
            updateData[
                "notificationSettings.aiRecommendations"
            ] = data.aiRecommendations;
        }

        if (
            data.weeklyReports !== undefined
        ) {
            updateData[
                "notificationSettings.weeklyReports"
            ] = data.weeklyReports;
        }

        const user =
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: updateData,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!user) {
            throw new AppError(
                "User not found",
                404
            );
        }

        return user;
    };

export const updateAppearance =
    async (userId, data) => {
        const user =
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        "appearance.theme":
                            data.theme,
                    },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!user) {
            throw new AppError(
                "User not found",
                404
            );
        }

        return user;
    };

export const changePassword = async (
    userId,
    currentPassword,
    newPassword
) => {
    const user = await User.findById(userId)
        .select("+passwordHash");

    if (!user) {
        throw new AppError(
            "User not found",
            404
        );
    }

    const isMatch =
        await bcrypt.compare(
            currentPassword,
            user.passwordHash
        );

    if (!isMatch) {
        throw new AppError(
            "Current password is incorrect",
            400
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            newPassword,
            12
        );

    user.passwordHash =
        hashedPassword;

    user.refreshTokenHash = null;

    await user.save();

    return true;
};