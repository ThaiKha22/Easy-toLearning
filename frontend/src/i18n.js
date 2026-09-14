import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      nav: {
        dashboard: 'Bảng điều khiển',
        subjects: 'Môn học',
        flashcards: 'Thẻ ghi nhớ',
        quizzes: 'Bài kiểm tra',
        studyPlan: 'Kế hoạch học tập',
        analytics: 'Phân tích',
        settings: 'Cài đặt',
        help: 'Trợ giúp',
      },
      page: {
        documents: 'Tài liệu',
        subject: 'Môn học',
        studyMaterial: 'Tài liệu học tập',
        quiz: 'Bài kiểm tra',
        quizResults: 'Kết quả kiểm tra',
        profile: 'Hồ sơ và cài đặt',
      },
      profile: {
        title: 'Hồ sơ',
        learningPreferences: 'Tùy chọn học tập',
        notifications: 'Thông báo',
        appearance: 'Giao diện',
        name: 'Họ và tên',
        email: 'Email',
        bio: 'Giới thiệu',
        dailyGoal: 'Mục tiêu học mỗi ngày (phút)',
        studyTime: 'Thời gian học ưu tiên',
        difficulty: 'Mức độ khó',
        language: 'Ngôn ngữ',
        save: 'Lưu thay đổi',
        loading: 'Đang tải hồ sơ...',
        updated: 'Đã cập nhật hồ sơ',
        vietnamese: 'Tiếng Việt',
        english: 'Tiếng Anh',
        morning: 'Buổi sáng',
        afternoon: 'Buổi chiều',
        evening: 'Buổi tối',
        night: 'Ban đêm',
        easy: 'Dễ',
        medium: 'Trung bình',
        hard: 'Khó',
        light: 'Sáng',
        dark: 'Tối',
        system: 'Theo hệ thống',
        studyReminders: 'Nhắc nhở học tập',
        studyRemindersDesc: 'Nhắc bạn học mỗi ngày để duy trì chuỗi học tập',
        quizReminders: 'Nhắc nhở kiểm tra',
        quizRemindersDesc: 'Nhắc bạn làm lại các bài kiểm tra đến hạn',
        aiRecommendations: 'Gợi ý từ AI',
        aiRecommendationsDesc: 'Đề xuất các buổi học được cá nhân hóa',
        weeklyReports: 'Báo cáo hàng tuần',
        weeklyReportsDesc: 'Tóm tắt tiến độ học tập vào mỗi Chủ nhật',
      },
      dashboard: {
        morning: 'Chào buổi sáng',
        afternoon: 'Chào buổi chiều',
        evening: 'Chào buổi tối',
        ready: 'Sẵn sàng tiếp tục học chưa?',
        recommendation: 'Gợi ý từ AI',
        recommendationPrefix: 'Dựa trên kết quả kiểm tra gần đây, bạn nên ôn lại',
        recommendationSuffix: 'trong {{minutes}} phút hôm nay.',
        startSession: 'Bắt đầu học',
        continueLearning: 'Tiếp tục học',
        viewAll: 'Xem tất cả',
        todayPlan: 'Kế hoạch học hôm nay',
        fullPlan: 'Xem kế hoạch đầy đủ',
        weakTopics: 'Chủ đề cần cải thiện',
        recentActivity: 'Hoạt động gần đây',
        overallProgress: 'Tiến độ tổng thể',
        studyStreak: 'Chuỗi ngày học',
        studyTime: 'Thời gian học',
        quizAverage: 'Điểm kiểm tra trung bình',
        days: 'ngày',
      },
      common: {
        search: 'Tìm kiếm môn học, tài liệu...',
        notifications: 'Thông báo',
        profile: 'Hồ sơ',
        logout: 'Đăng xuất',
        minute: 'phút',
        hour: 'giờ',
      },
      content: {
        subjectsCount: '{{count}} môn học', createSubject: 'Tạo môn học', noSubjects: 'Chưa có môn học',
        noSubjectsDescription: 'Tạo môn học để bắt đầu sắp xếp tài liệu, thẻ ghi nhớ và bài kiểm tra.',
        subjectName: 'Tên môn học', subjectNamePlaceholder: 'Ví dụ: Đại số tuyến tính', subjectNameRequired: 'Vui lòng nhập tên môn học.', subjectDescription: 'Mô tả', subjectDescriptionPlaceholder: 'Môn học này nói về điều gì?', examDate: 'Ngày thi', dailyStudyTime: 'Thời gian học mỗi ngày (phút)',
        documents: 'Tài liệu', noDocuments: 'Chưa có tài liệu', uploadFirst: 'Tải tài liệu đầu tiên để bắt đầu học.',
        deleteDocument: 'Xóa tài liệu?', deleteDescription: 'Tài liệu và các nội dung học tập do AI tạo sẽ bị xóa vĩnh viễn.', delete: 'Xóa', back: 'Quay lại',
        noQuizzes: 'Chưa có bài kiểm tra', noQuizzesDescription: 'Tạo bài kiểm tra từ tài liệu học tập để tự kiểm tra kiến thức.',
        studyPlan: 'Kế hoạch học tập', tailored: 'Được thiết kế cho {{subject}}', rebuild: 'Nhờ AI xây dựng lại kế hoạch', untilExam: 'ngày đến kỳ thi {{subject}}',
        overallProgress: 'Tiến độ tổng thể', activeSubjects: 'Trên tất cả môn học đang học', thisWeek: 'Tuần này',
      },
      analytics: {
        totalStudyTime: 'Tổng thời gian học', currentStreak: 'Chuỗi ngày hiện tại', averageQuiz: 'Điểm kiểm tra trung bình', topicsMastered: 'Chủ đề đã nắm vững',
        insight: 'Nhận xét AI', improvement: 'Hiệu suất kiểm tra của bạn đã cải thiện 14% trong hai tuần qua.', studyTime: 'Thời gian học mỗi tuần', quizPerformance: 'Kết quả kiểm tra theo thời gian', topicMastery: 'Mức độ nắm vững chủ đề', consistency: 'Mức độ đều đặn khi học', weakTopics: 'Chủ đề cần cải thiện',
      },
      auth: {
        welcome: 'Chào mừng bạn quay lại', subtitle: 'Đăng nhập để tiếp tục hành trình học tập.', email: 'Email', password: 'Mật khẩu', remember: 'Ghi nhớ đăng nhập', forgot: 'Quên mật khẩu?', login: 'Đăng nhập', google: 'Tiếp tục với Google', noAccount: 'Chưa có tài khoản?', create: 'Tạo tài khoản',
        smarter: 'Học thông minh hơn, không cần học lâu hơn.', summaries: 'Tóm tắt, thẻ ghi nhớ và bài kiểm tra AI từ ghi chú của bạn', plans: 'Kế hoạch học tập thích ứng với khó khăn thực tế của bạn', private: 'Tài liệu của bạn luôn được bảo mật', rights: '© 2026 AI StudyHub. Dành cho những sinh viên muốn lấy lại thời gian.',
      },
      landing: {
        features: 'Tính năng', howItWorks: 'Cách hoạt động', login: 'Đăng nhập', getStarted: 'Bắt đầu ngay',
        badge: 'Trợ lý học tập được hỗ trợ bởi AI', heroTitle1: 'Học thông minh hơn.', heroTitle2: 'Tiến bộ nhanh hơn.',
        heroDescription: 'Biến tài liệu học tập thành bản tóm tắt, thẻ ghi nhớ, bài kiểm tra và kế hoạch học tập cá nhân hóa.', explore: 'Khám phá tính năng', students: '24.000+ sinh viên đã tham gia học kỳ này',
        ready: 'Sẵn sàng tiếp tục học chưa?', streak: '{{count}} ngày liên tục', progress: 'Tiến độ', quizAverage: 'Điểm kiểm tra', streakShort: 'Chuỗi ngày', recommendation: 'Dựa trên kết quả gần đây, chúng tôi đề xuất ôn {{topic}} trong 20 phút hôm nay.', lastQuiz: 'Bài kiểm tra gần nhất',
        everything: 'Mọi thứ bạn cần', platform: 'Một nền tảng, từ tải tài liệu đến làm chủ kiến thức.', summaries: 'Tóm tắt AI', summariesDesc: 'Tải lên PDF, DOCX hoặc TXT và nhận bản tóm tắt rõ ràng trong vài giây.', flashcards: 'Thẻ ghi nhớ thông minh', flashcardsDesc: 'Thẻ ghi nhớ tự động thích ứng với những nội dung bạn thường trả lời sai.', quizGenerator: 'Tạo bài kiểm tra AI', quizGeneratorDesc: 'Bài kiểm tra được tạo trực tiếp từ tài liệu học tập của bạn.', studyPlans: 'Kế hoạch học tập cá nhân', studyPlansDesc: 'Kế hoạch mỗi ngày điều chỉnh theo ngày thi và thời gian bạn có.', analytics: 'Phân tích học tập', analyticsDesc: 'Biết chính xác bạn đang tiến bộ ở đâu và cần cải thiện điều gì.',
        process: 'Quy trình', processTitle: 'Từ ghi chú thô đến kế hoạch học tập chỉ trong ba bước.', upload: 'Tải tài liệu lên', uploadDesc: 'Thêm slide bài giảng, PDF hoặc ghi chú để AI đọc và sắp xếp theo môn học.', transform: 'Để AI xử lý', transformDesc: 'Tự động tạo bản tóm tắt, thẻ ghi nhớ và bài kiểm tra từ tài liệu của bạn.', track: 'Học và theo dõi tiến độ', trackDesc: 'Học theo kế hoạch thích ứng với ngày thi và chủ đề bạn còn yếu.',
        performance: 'Kết quả kiểm tra', month: '+14% tháng này', know: 'Biết chính xác vị trí của bạn', analyticsTitle: 'Biến thời gian học thành chiến lược.', analyticsDesc: 'Theo dõi thời gian học, kết quả kiểm tra và mức độ nắm vững chủ đề để mỗi buổi học tập trung vào điều giúp cải thiện điểm số.',
        ctaTitle: 'Sẵn sàng học thông minh hơn?', ctaDesc: 'Tải tài liệu đầu tiên và xem kế hoạch học tập cá nhân trong vài phút.', free: 'Bắt đầu ngay — hoàn toàn miễn phí', rights: '© 2026 AI StudyHub. Bảo lưu mọi quyền.',
      },
      documents: { upload: 'Đang tải lên...', processing: 'Đang xử lý tài liệu...', generating: 'AI đang tạo tài liệu học tập...', drop: 'Kéo thả tệp vào đây hoặc nhấp để chọn', supports: 'Hỗ trợ PDF, DOCX và TXT', uploaded: 'Đã tải lên', ready: 'Sẵn sàng', error: 'Lỗi', download: 'Tải xuống', delete: 'Xóa' },
      flashcards: { all: 'Tất cả thẻ ghi nhớ', exit: 'Thoát phiên học', question: 'Câu hỏi', answer: 'Đáp án', reveal: 'Nhấn để xem đáp án', showQuestion: 'Nhấn để xem câu hỏi', card: 'Thẻ', of: 'trên', shuffle: 'Xáo trộn', previous: 'Trước', next: 'Sau', hard: 'Khó', good: 'Tốt', easy: 'Dễ', mastered: 'đã thuộc', noCards: 'Chưa có thẻ ghi nhớ', generate: 'Tạo thẻ ghi nhớ từ tài liệu học tập.', deckShuffled: 'Đã xáo trộn bộ thẻ', marked: 'Đã đánh dấu “{{label}}”', complete: 'Đã hoàn thành bộ thẻ!' },
      quizResult: { backToQuizzes: 'Quay lại bài kiểm tra', correct: 'đúng', incorrect: 'sai', minutes: 'phút', strongTopics: 'Chủ đề nắm vững', needsImprovement: 'Cần cải thiện', aiAnalysis: 'Phân tích từ AI', reviewWeakTopics: 'Ôn chủ đề cần cải thiện', generateSimilar: 'Tạo bài kiểm tra tương tự', backToSubject: 'Quay lại môn học' },
      documentDetail: { summary: 'Tóm tắt', keyConcepts: 'Khái niệm chính', flashcards: 'Thẻ ghi nhớ', quiz: 'Bài kiểm tra', back: 'Quay lại', summaryUnavailable: 'Chưa có bản tóm tắt.', generateSummary: 'Tạo bản tóm tắt', flashcardsGenerated: 'Đã tạo thẻ ghi nhớ', quizGenerated: 'Đã tạo bài kiểm tra', createQuiz: 'Tạo bài kiểm tra bằng AI', createAnotherQuiz: 'Tạo thêm bài kiểm tra', quizDescription: 'AI sẽ tạo câu hỏi dựa trên nội dung của tài liệu này.', questionCount: 'Số lượng câu hỏi', createNewQuiz: 'Tạo bài kiểm tra mới', existingQuiz: 'Bài kiểm tra hiện có', questions: 'Câu hỏi', difficulty: 'Độ khó', minutes: 'phút', startQuiz: 'Bắt đầu làm bài', question: 'Câu hỏi', answer: 'Đáp án', noFlashcards: 'Tài liệu này chưa có thẻ ghi nhớ.', createFlashcards: 'Tạo thẻ ghi nhớ', studyAllFlashcards: 'Học toàn bộ thẻ', difficultyEasy: 'Dễ', difficultyMedium: 'Trung bình', difficultyHard: 'Khó' },
      plan: { rebuildTitle: 'Nhờ AI xây dựng lại kế hoạch', examDate: 'Ngày thi', dailyTime: 'Thời gian học mỗi ngày (phút)', targetScore: 'Điểm mục tiêu (%)', difficulty: 'Mức độ khó', rebuild: 'Xây dựng lại kế hoạch' },
      subject: { overview: 'Tổng quan', documents: 'Tài liệu', topics: 'Chủ đề', flashcards: 'Thẻ ghi nhớ', quizzes: 'Bài kiểm tra', studied: 'Đã học', continue: 'Tiếp tục', complete: 'hoàn thành', upload: 'Tải tài liệu lên', startSession: 'Bắt đầu buổi học', finishSession: 'Kết thúc buổi học', noDocuments: 'Chưa có tài liệu', uploadFirst: 'Tải tài liệu đầu tiên để bắt đầu học.', noTopics: 'Chưa có chủ đề được theo dõi', topicsDescription: 'Chủ đề sẽ xuất hiện sau khi AI xử lý tài liệu.', noFlashcards: 'Chưa có thẻ ghi nhớ', generateFlashcards: 'Tạo thẻ ghi nhớ từ tài liệu học tập.', noQuizzes: 'Chưa có bài kiểm tra', generateQuiz: 'Tạo bài kiểm tra từ tài liệu học tập.', studyTime: 'Thời gian học tuần này', activity: 'Hoạt động gần đây', tasksCompleted: 'nhiệm vụ học tập đã hoàn thành', noActivity: 'Chưa có hoạt động nào.', mastery: 'Mức độ nắm vững tổng thể của {{subject}}', weakTopics: 'Chủ đề cần cải thiện', noWeakTopics: 'Chưa xác định được chủ đề cần cải thiện.' },
    },
  },
  en: {
    translation: {
      nav: {
        dashboard: 'Dashboard', subjects: 'My Subjects', flashcards: 'Flashcards', quizzes: 'Quizzes',
        studyPlan: 'Study Plan', analytics: 'Analytics', settings: 'Settings', help: 'Help',
      },
      page: {
        documents: 'Documents', subject: 'Subject', studyMaterial: 'Study Material', quiz: 'Quiz',
        quizResults: 'Quiz Results', profile: 'Profile & Settings',
      },
      profile: {
        title: 'Profile', learningPreferences: 'Learning Preferences', notifications: 'Notifications',
        appearance: 'Appearance', name: 'Name', email: 'Email', bio: 'Bio', dailyGoal: 'Daily study goal (min)',
        studyTime: 'Preferred study time', difficulty: 'Difficulty preference', language: 'Language',
        save: 'Save Changes', loading: 'Loading profile...', updated: 'Profile updated',
        vietnamese: 'Vietnamese', english: 'English', morning: 'Morning', afternoon: 'Afternoon',
        evening: 'Evening', night: 'Night', easy: 'Easy', medium: 'Medium', hard: 'Hard',
        light: 'Light', dark: 'Dark', system: 'System',
        studyReminders: 'Study reminders', studyRemindersDesc: 'Daily nudges to keep your streak going',
        quizReminders: 'Quiz reminders', quizRemindersDesc: 'Reminders to retake quizzes you are due for',
        aiRecommendations: 'AI recommendations', aiRecommendationsDesc: 'Personalized session suggestions',
        weeklyReports: 'Weekly reports', weeklyReportsDesc: 'A summary of your progress every Sunday',
      },
      dashboard: {
        morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening', ready: 'Ready to continue learning?',
        recommendation: 'AI Recommendation', recommendationPrefix: 'Based on your recent quiz results, we recommend reviewing', recommendationSuffix: 'for {{minutes}} minutes today.',
        startSession: 'Start Learning', continueLearning: 'Continue Learning', viewAll: 'View all', todayPlan: "Today's Study Plan", fullPlan: 'Full plan',
        weakTopics: 'Weak Topics', recentActivity: 'Recent Activity', overallProgress: 'Overall Progress', studyStreak: 'Study Streak', studyTime: 'Study Time', quizAverage: 'Quiz Average', days: 'days',
      },
      common: { search: 'Search subjects, documents...', notifications: 'Notifications', profile: 'Profile', logout: 'Log out', minute: 'min', hour: 'h' },
      content: {
        subjectsCount: '{{count}} subjects', createSubject: 'Create Subject', noSubjects: 'No subjects yet', noSubjectsDescription: 'Create a subject to start organizing your documents, flashcards and quizzes.',
        subjectName: 'Name', subjectNamePlaceholder: 'e.g. Linear Algebra', subjectNameRequired: 'Subject name is required.', subjectDescription: 'Description', subjectDescriptionPlaceholder: 'What is this subject about?', examDate: 'Exam date', dailyStudyTime: 'Daily study time (min)',
        documents: 'Documents', noDocuments: 'No documents yet', uploadFirst: 'Upload your first document to start learning.', deleteDocument: 'Delete document?', deleteDescription: 'This will permanently remove the document and AI-generated materials.', delete: 'Delete', back: 'Back',
        noQuizzes: 'No quizzes yet', noQuizzesDescription: 'Generate a quiz from your study materials to test yourself.', studyPlan: 'Your Study Plan', tailored: 'Tailored to {{subject}}', rebuild: 'Ask AI to Rebuild Plan', untilExam: 'days until your {{subject}} exam', overallProgress: 'Overall Progress', activeSubjects: 'Across all active subjects', thisWeek: 'This Week',
      },
      analytics: {
        totalStudyTime: 'Total Study Time', currentStreak: 'Current Streak', averageQuiz: 'Average Quiz Score', topicsMastered: 'Topics Mastered', insight: 'AI Insight', improvement: 'Your quiz performance has improved 14% over the last two weeks.', studyTime: 'Study Time Per Week', quizPerformance: 'Quiz Performance Over Time', topicMastery: 'Topic Mastery', consistency: 'Study Consistency', weakTopics: 'Weak Topics',
      },
      auth: {
        welcome: 'Welcome back', subtitle: 'Log in to pick up where you left off.', email: 'Email', password: 'Password', remember: 'Remember me', forgot: 'Forgot password?', login: 'Log in', google: 'Continue with Google', noAccount: 'Don’t have an account?', create: 'Create one',
        smarter: 'Study smarter, not longer.', summaries: 'AI-generated summaries, flashcards and quizzes from your own notes', plans: 'Study plans that adapt to what you actually struggle with', private: 'Your materials stay private, always', rights: '© 2026 AI StudyHub. Built for students who want their time back.',
      },
      landing: {
        features: 'Features', howItWorks: 'How it works', login: 'Log in', getStarted: 'Get Started', badge: 'AI-powered study companion', heroTitle1: 'Study Smarter.', heroTitle2: 'Learn Faster.', heroDescription: 'Turn your study materials into personalized summaries, flashcards, quizzes and AI-powered learning plans.', explore: 'Explore Features', students: 'Joined by 24,000+ students this term', ready: 'Ready to continue learning?', streak: '{{count}} day streak', progress: 'Progress', quizAverage: 'Quiz avg', streakShort: 'Streak', recommendation: 'Based on your recent quiz results, we recommend reviewing {{topic}} for 20 minutes today.', lastQuiz: 'Last quiz', everything: 'Everything you need', platform: 'One platform, from upload to mastery.', summaries: 'AI Summaries', summariesDesc: 'Upload any PDF, DOCX or TXT and get a clean, readable summary in seconds.', flashcards: 'Smart Flashcards', flashcardsDesc: 'Auto-generated flashcards that adapt to what you keep getting wrong.', quizGenerator: 'AI Quiz Generator', quizGeneratorDesc: 'Practice quizzes built directly from your own study materials.', studyPlans: 'Personalized Study Plans', studyPlansDesc: 'A daily plan that adjusts to your exam date and available time.', analytics: 'Learning Analytics', analyticsDesc: 'See exactly where you’re improving — and where you’re not.', process: 'The process', processTitle: 'From raw notes to a study plan in three steps.', upload: 'Upload your materials', uploadDesc: 'Drop in lecture slides, PDFs, or notes — AI StudyHub reads and organizes them by subject.', transform: 'Let AI transform them', transformDesc: 'Get summaries, flashcards and quizzes generated automatically from what you uploaded.', track: 'Learn and track your progress', trackDesc: 'Study with a plan that adapts to your exam date and the topics you’re weakest on.', performance: 'Quiz performance', month: '+14% this month', know: 'Know exactly where you stand', analyticsTitle: 'Analytics that turn study time into strategy.', analyticsDesc: 'Track study time, quiz performance, and topic mastery over time — so every session targets what will actually move your grade.', ctaTitle: 'Ready to study smarter?', ctaDesc: 'Upload your first document and see your personalized study plan in minutes.', free: 'Get Started — it’s free', rights: '© 2026 AI StudyHub. All rights reserved.',
      },
      documents: { upload: 'Uploading...', processing: 'Processing document...', generating: 'AI generating study materials...', drop: 'Drag & drop files here, or click to browse', supports: 'Supports PDF, DOCX and TXT', uploaded: 'Uploaded', ready: 'Ready', error: 'Error', download: 'Download', delete: 'Delete' },
      flashcards: { all: 'All flashcards', exit: 'Exit session', question: 'Question', answer: 'Answer', reveal: 'Tap to reveal answer', showQuestion: 'Tap to see question', card: 'Card', of: 'of', shuffle: 'Shuffle', previous: 'Previous', next: 'Next', hard: 'Hard', good: 'Good', easy: 'Easy', mastered: 'mastered', noCards: 'No flashcards available', generate: 'Generate flashcards from your study materials.', deckShuffled: 'Deck shuffled', marked: 'Marked “{{label}}”', complete: 'Deck complete!' },
      quizResult: { backToQuizzes: 'Back to quizzes', correct: 'correct', incorrect: 'incorrect', minutes: 'min', strongTopics: 'Strong topics', needsImprovement: 'Needs improvement', aiAnalysis: 'AI analysis', reviewWeakTopics: 'Review weak topics', generateSimilar: 'Generate similar quiz', backToSubject: 'Back to subject' },
      documentDetail: { summary: 'Summary', keyConcepts: 'Key Concepts', flashcards: 'Flashcards', quiz: 'Quiz', back: 'Back', summaryUnavailable: 'Summary is not available yet.', generateSummary: 'Generate Summary', flashcardsGenerated: 'Flashcards generated', quizGenerated: 'Quiz created', createQuiz: 'Create AI quiz', createAnotherQuiz: 'Create another quiz', quizDescription: 'AI will create questions based on this document.', questionCount: 'Number of questions', createNewQuiz: 'Create new quiz', existingQuiz: 'Existing quiz', questions: 'Questions', difficulty: 'Difficulty', minutes: 'Minutes', startQuiz: 'Start Quiz', question: 'Question', answer: 'Answer', noFlashcards: 'No flashcards have been generated for this document yet.', createFlashcards: 'Generate Flashcards', studyAllFlashcards: 'Study all flashcards', difficultyEasy: 'Easy', difficultyMedium: 'Medium', difficultyHard: 'Hard' },
      plan: { rebuildTitle: 'Ask AI to Rebuild Plan', examDate: 'Exam date', dailyTime: 'Daily available time (min)', targetScore: 'Target score (%)', difficulty: 'Difficulty', rebuild: 'Rebuild My Plan' },
      subject: { overview: 'Overview', documents: 'Documents', topics: 'Topics', flashcards: 'Flashcards', quizzes: 'Quizzes', studied: 'Studied', continue: 'Continue', complete: 'complete', upload: 'Upload Document', startSession: 'Start Study Session', finishSession: 'Finish Study Session', noDocuments: 'No documents yet', uploadFirst: 'Upload your first document to start learning.', noTopics: 'No topics tracked yet', topicsDescription: 'Topics appear once AI processes your documents.', noFlashcards: 'No flashcards available', generateFlashcards: 'Generate flashcards from your study materials.', noQuizzes: 'No quizzes yet', generateQuiz: 'Generate a quiz from your study materials.', studyTime: 'Study Time This Week', activity: 'Recent Activity', tasksCompleted: 'study tasks completed', noActivity: 'No activity recorded yet.', mastery: 'Overall mastery of {{subject}}', weakTopics: 'Weak Topics', noWeakTopics: 'No weak topics identified yet.' },
    },
  },
};

const initialLanguage = 'vi';
localStorage.setItem('studyhub_language', initialLanguage);

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'vi',
  interpolation: { escapeValue: false },
});

document.documentElement.lang = initialLanguage;
i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
  localStorage.setItem('studyhub_language', language);
});

export default i18n;
