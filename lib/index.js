"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
var smee_client_1 = __importDefault(require("smee-client"));
var body_parser_1 = __importDefault(require("body-parser"));
var app_1 = __importDefault(require("@octokit/app"));
var request_1 = __importDefault(require("@octokit/request"));
var getInstallationId = function () { return __awaiter(_this, void 0, void 0, function () {
    var app, jwt, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new app_1.default({ id: +process.env.APP_ID, privateKey: process.env.PRIVATE_KEY });
                jwt = app.getSignedJsonWebToken();
                return [4 /*yield*/, request_1.default('GET /repos/:owner/:repo/installation', {
                        owner: 'B3zo0',
                        repo: 'grapqhl-todo-app-typescript',
                        headers: {
                            authorization: "Bearer " + jwt,
                            accept: 'application/vnd.github.machine-man-preview+json'
                        }
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data.id];
        }
    });
}); };
module.exports = function (app) {
    var router = app.route('/dn');
    // create application/json parser
    var jsonParser = body_parser_1.default.json();
    var smee = new smee_client_1.default({
        source: 'https://smee.io/gnNKGUGRxPpZaTs',
        target: 'http://localhost:3000/dn/events',
        logger: console
    });
    smee.start();
    router.post('/events', jsonParser, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var installationId, githubApi, comments, comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getInstallationId()];
                case 1:
                    installationId = _a.sent();
                    return [4 /*yield*/, app.auth(installationId)];
                case 2:
                    githubApi = _a.sent();
                    return [4 /*yield*/, githubApi.issues.listComments({ owner: 'B3zo0', repo: 'grapqhl-todo-app-typescript', issue_number: 4 })];
                case 3:
                    comments = _a.sent();
                    comment = comments.data.find(function (c) { return c.user.login === 'deploy-notifier[bot]'; });
                    if (comment) {
                        githubApi.issues.updateComment({ comment_id: comment.id, body: 'Updated', owner: 'B3zo0', repo: 'grapqhl-todo-app-typescript' });
                    }
                    else {
                        githubApi.issues.createComment({
                            body: JSON.stringify(req.body),
                            issue_number: 4,
                            owner: 'B3zo0',
                            repo: 'grapqhl-todo-app-typescript'
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
};
//# sourceMappingURL=index.js.map