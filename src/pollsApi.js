/**
 * API Reference: http://docs.pollsapi.apiary.io/
 */

const
    axios = require("axios").create({
        baseURL: "http://polls.apiblueprint.org/"
    }),
    parseLinkHeader = require("parse-link-header");

module.exports = {
    /**
     * Get all questions
     * @param page - optional
     * @returns Promise
     */
    getQuestions(page) {
        page = page || 1;
        return new Promise((resolve, reject) => {
            axios.get("/questions", {
                params: {
                    page: page
                }
            }).then((res) => {
                resolve(res.data, parseLinkHeader(res.headers.link));
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Get a specific question
     * @param urlOrId
     * @returns Promise
     */
    getQuestion(urlOrId) {
        let questionUrl = urlOrId;
        if (!isNaN(Number(questionUrl))) {
            questionUrl = "/questions/" + urlOrId;
        }
        if (!questionUrl) return Promise.reject(Error("Invalid question specified."));

        return new Promise((resolve, reject) => {
            axios.get(questionUrl).then((res) => {
                resolve(res.data);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Create a new question / poll
     * @param data - Object containing `question` and `choices` array
     * @returns Promise
     */
    createQuestion(data) {
        if (!data.question || !data.choices) {
            return Promise.reject(Error("Insufficient data (question, choices)"));
        }
        if (!Array.isArray(data.choices)) return Promise.reject(Error("`choices` is not an array"));

        return new Promise((resolve, reject) => {
            axios.post("/questions", data).then((res) => {
                resolve(res.data, res.headers.location);
            }).catch((e) => {
                reject(e);
            });
        });
    },

    /**
     * Vote on a choice by choice URI or choice ID and question ID
     * @param choiceId - Choice URI or choice ID (question ID will also be required when specifying choice ID)
     * @param questionId - Only required if first parameter is not full choice URI
     * @returns Promise
     */
    voteOnChoice(choiceId, questionId) {
        let choiceUrl = choiceId;
        if (choiceId && questionId) {
            choiceUrl = "/questions/" + questionId + "/choices/" + choiceId;
        }
        if (!choiceUrl) return Promise.reject(Error("Invalid choice specified."));

        return new Promise((resolve, reject) => {
            axios.post(choiceUrl).then((res) => {
                resolve();
            }).catch((e) => {
                reject(e);
            });
        });
    }
};
