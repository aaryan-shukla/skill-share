import React, { useState } from "react";
import { Plus, Trash2, GripVertical, Settings, Copy } from "lucide-react";

interface Option {
    id: number;
    value: string;
}

interface Question {
    id: string;
    question: string;
    questionType: 'mcq' | 'written' | 'input';
    options: Option[];
    correctAns: number[];
    correctWrittenAns?: string;
    correctInputAns?: string;
    inputPattern?: string;
    marks: number;
}

interface TestData {
    title: string;
    description: string;
    totalMarks: number;
    questions: Question[];
}

const TestPage: React.FC = () => {
    const [testTitle, setTestTitle] = useState<string>("");
    const [testDescription, setTestDescription] = useState<string>("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const addNewQuestion = () => {
        const newQuestion: Question = {
            id: Date.now().toString(),
            question: "",
            questionType: 'mcq',
            options: [
                { id: 1, value: "" },
                { id: 2, value: "" },
            ],
            correctAns: [],
            correctWrittenAns: "",
            correctInputAns: "",
            inputPattern: "",
            marks: 1,
        };
        setQuestions([...questions, newQuestion]);
    };

    const updateQuestion = (id: string, field: keyof Question, value: any) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ));
    };

    const toggleCorrectAnswer = (questionId: string, optionId: number) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const currentCorrectAns = q.correctAns || [];
                const newCorrectAns = currentCorrectAns.includes(optionId)
                    ? currentCorrectAns.filter(id => id !== optionId)
                    : [...currentCorrectAns, optionId];
                return { ...q, correctAns: newCorrectAns };
            }
            return q;
        }));
    };

    const addOption = (questionId: string) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const nextId = Math.max(...q.options.map(opt => opt.id), 0) + 1;
                return {
                    ...q,
                    options: [...q.options, { id: nextId, value: "" }]
                };
            }
            return q;
        }));
    };

    const removeOption = (questionId: string, optionId: number) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId && q.options.length > 2) {
                return {
                    ...q,
                    options: q.options.filter(opt => opt.id !== optionId),
                    correctAns: q.correctAns.filter(id => id !== optionId)
                };
            }
            return q;
        }));
    };

    const handleSubmit = () => {
        const isValid = questions.every(q => {
            if (q.question.trim() === "") return false;

            if (q.questionType === 'mcq') {
                return q.options.every(opt => opt.value.trim() !== "") && q.correctAns.length > 0;
            } else if (q.questionType === 'written') {
                return q.correctWrittenAns && q.correctWrittenAns.trim() !== "";
            } else {
                return q.correctInputAns && q.correctInputAns.trim() !== "";
            }
        });

        if (!isValid) {
            alert("Please complete all questions and their answers before submitting.");
            return;
        }

        // Calculate total marks
        const totalMarks = questions.reduce((sum, question) => sum + question.marks, 0);

        // Create the complete test data object
        const testData: TestData = {
            title: testTitle,
            description: testDescription,
            totalMarks,
            questions
        };

        // Log the complete test data
        console.log('Test Data:', testData);

        setIsSubmitted(true);
    };

    const renderOption = (question: Question, option: Option, optIndex: number) => (
        <div key={`${question.id}-option-${option.id}`} className="flex items-center group">
            <input
                type="checkbox"
                checked={question.correctAns.includes(option.id)}
                onChange={() => toggleCorrectAnswer(question.id, option.id)}
                className="mr-3 h-4 w-4 text-purple-600 rounded"
            />
            <input
                type="text"
                value={option.value}
                onChange={(e) => updateQuestion(
                    question.id,
                    "options",
                    question.options.map(opt =>
                        opt.id === option.id ? { ...opt, value: e.target.value } : opt
                    )
                )}
                placeholder={`Option ${optIndex + 1}`}
                className="flex-grow border-b border-gray-300 focus:border-purple-600 focus:outline-none"
            />
            {question.options.length > 2 && (
                <button
                    onClick={() => removeOption(question.id, option.id)}
                    className="ml-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Trash2 size={18} />
                </button>
            )}
        </div>
    );

    const renderInputAnswer = (question: Question) => (
        <div className="pl-8 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
                <input
                    type="text"
                    value={question.correctInputAns}
                    onChange={(e) => updateQuestion(question.id, "correctInputAns", e.target.value)}
                    placeholder="Enter the correct answer"
                    className="w-full border rounded-md p-2 focus:border-purple-600 focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Input Pattern (optional)</label>
                <input
                    type="text"
                    value={question.inputPattern}
                    onChange={(e) => updateQuestion(question.id, "inputPattern", e.target.value)}
                    placeholder="e.g., [0-9]+ for numbers only"
                    className="w-full border rounded-md p-2 focus:border-purple-600 focus:outline-none"
                />
            </div>
        </div>
    );

    const renderQuestionEditor = (question: Question, index: number) => (
        <div key={question.id} className="bg-white rounded-lg shadow-sm mb-4 p-6 relative group">
            <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                <GripVertical className="text-gray-400" size={20} />
            </div>

            <div className="flex items-start mb-4 pr-24">
                <div className="flex-grow">
                    <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
                        placeholder={`Question ${index + 1}`}
                        className="w-full text-lg font-medium border-b border-gray-300 focus:border-purple-600 focus:outline-none pb-1"
                    />
                </div>
                <div className="ml-4 flex items-center space-x-2">
                    <select
                        value={question.questionType}
                        onChange={(e) => updateQuestion(question.id, "questionType", e.target.value as Question['questionType'])}
                        className="border rounded-md px-2 py-1 text-sm"
                    >
                        <option value="mcq">Multiple Choice</option>
                        <option value="written">Written Answer</option>
                        <option value="input">Input Field</option>
                    </select>
                    <input
                        type="number"
                        value={question.marks}
                        onChange={(e) => updateQuestion(question.id, "marks", Math.max(1, Number(e.target.value)))}
                        className="w-16 text-sm border rounded-md px-2 py-1"
                        min="1"
                        placeholder="Marks"
                    />
                </div>
            </div>

            {question.questionType === 'mcq' && (
                <div className="pl-8 space-y-2">
                    {question.options.map((option, optIndex) => renderOption(question, option, optIndex))}
                    <div className="flex items-center mt-2">
                        <button
                            onClick={() => addOption(question.id)}
                            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center"
                        >
                            <Plus size={18} className="mr-1" />
                            Add Option
                        </button>
                    </div>
                </div>
            )}

            {question.questionType === 'written' && (
                <div className="pl-8 mt-4">
                    <textarea
                        value={question.correctWrittenAns}
                        onChange={(e) => updateQuestion(question.id, "correctWrittenAns", e.target.value)}
                        placeholder="Enter the correct answer"
                        className="w-full border rounded-md p-2 min-h-[100px] focus:border-purple-600 focus:outline-none"
                    />
                </div>
            )}

            {question.questionType === 'input' && renderInputAnswer(question)}

            <div className="absolute right-4 top-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => {
                        const newQuestion = { ...question, id: Date.now().toString() };
                        setQuestions([...questions, newQuestion]);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                    <Copy size={18} />
                </button>
                <button
                    onClick={() => setQuestions(questions.filter(q => q.id !== question.id))}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );

    const renderSubmittedQuestion = (question: Question, index: number) => (
        <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">
                    Question {index + 1}: {question.question}
                </h3>
                <div className="text-sm text-gray-600">
                    <span className="mr-4">
                        {question.questionType === 'mcq'
                            ? 'Multiple Choice'
                            : question.questionType === 'input'
                                ? 'Input Field'
                                : 'Written Answer'}
                    </span>
                    <span>Marks: {question.marks}</span>
                </div>
            </div>

            {question.questionType === 'mcq' && (
                <div className="space-y-2 pl-8">
                    {question.options.map((option) => (
                        <div
                            key={`${question.id}-option-${option.id}`}
                            className={`flex items-center ${question.correctAns.includes(option.id) ? 'text-green-600 font-medium' : ''
                                }`}
                        >
                            <span className="mr-3">{question.correctAns.includes(option.id) ? '✓' : '○'}</span>
                            <span>{option.value}</span>
                        </div>
                    ))}
                </div>
            )}

            {question.questionType === 'written' && (
                <div className="pl-8 mt-2">
                    <div className="text-sm font-medium text-gray-600 mb-1">Correct Answer:</div>
                    <div className="bg-gray-50 p-3 rounded-md">{question.correctWrittenAns}</div>
                </div>
            )}

            {question.questionType === 'input' && (
                <div className="pl-8 mt-2">
                    <div className="text-sm font-medium text-gray-600 mb-1">Correct Answer:</div>
                    <div className="bg-gray-50 p-3 rounded-md">
                        <div>{question.correctInputAns}</div>
                        {question.inputPattern && (
                            <div className="text-sm text-gray-500 mt-1">
                                Pattern: {question.inputPattern}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
    console.log("hello", questions);
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm mb-4 border-t-8 border-purple-600">
                    <div className="p-6">
                        <input
                            type="text"
                            value={testTitle}
                            onChange={(e) => setTestTitle(e.target.value)}
                            placeholder="Test Title"
                            className="w-full text-3xl font-bold border-b border-gray-300 focus:border-purple-600 focus:outline-none mb-4 pb-2"
                            disabled={isSubmitted}
                        />
                        <input
                            type="text"
                            value={testDescription}
                            onChange={(e) => setTestDescription(e.target.value)}
                            placeholder="Test Description"
                            className="w-full text-gray-600 border-b border-gray-300 focus:border-purple-600 focus:outline-none"
                            disabled={isSubmitted}
                        />
                    </div>
                </div>

                {!isSubmitted ? (
                    <div className="space-y-4">
                        {questions.map((question, index) => renderQuestionEditor(question, index))}
                        <button
                            onClick={addNewQuestion}
                            className="w-full bg-white rounded-lg shadow-sm p-4 text-purple-600 hover:bg-gray-50 flex items-center justify-center font-medium mb-4"
                        >
                            <Plus size={20} className="mr-2" />
                            Add Question
                        </button>
                        {questions.length > 0 && (
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-purple-600 text-white rounded-lg shadow-sm p-4 hover:bg-purple-700 font-medium"
                            >
                                Submit Test
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {questions.map((question, index) => renderSubmittedQuestion(question, index))}
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="w-full bg-gray-100 text-gray-600 rounded-lg shadow-sm p-4 hover:bg-gray-200 font-medium"
                        >
                            Edit Test
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestPage;
