"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var anchor = require("@project-serum/anchor");
var fs = require("fs");
function createBlogAcount() {
    return __awaiter(this, void 0, void 0, function () {
        var ProgramId, idl, Keypair, wallet, con, provider, Program, blogAcc, ix;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ProgramId = new anchor.web3.PublicKey("A1Z5g145cwSqtHv5aEF7MeARfT46cm8cq8w33inoisuA");
                    idl = JSON.parse(fs.readFileSync("/mnt/c/Users/home/PycharmProjects/solana/solblog/target/idl/solblog.json", "utf8"));
                    Keypair = anchor.web3.Keypair.fromSecretKey(Uint8Array.from([125, 215, 2, 14, 10, 163, 144, 235, 149, 163, 195, 26, 108, 51, 188, 87, 198, 74, 23, 110, 157, 186, 167, 176, 239, 61, 212, 204, 153, 146, 147, 218, 85, 229, 221, 209, 250, 178, 94, 134, 72, 232, 111, 154, 201, 194, 118, 208, 26, 68, 236, 118, 74, 202, 225, 52, 111, 178, 199, 191, 45, 11, 102, 57]));
                    console.log(Keypair.publicKey.toBase58());
                    wallet = new anchor.Wallet(Keypair);
                    con = new anchor.web3.Connection("https://api.devnet.solana.com");
                    console.log(con.getBalance(wallet.publicKey));
                    provider = new anchor.AnchorProvider(con, wallet, anchor.AnchorProvider.defaultOptions());
                    Program = new anchor.Program(idl, ProgramId, provider);
                    blogAcc = anchor.web3.Keypair.generate();
                    return [4 /*yield*/, con.requestAirdrop(wallet.publicKey, anchor.web3.LAMPORTS_PER_SOL)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Program.methods.initialize()
                            .accounts({
                            blogAccount: blogAcc.publicKey,
                            authority: wallet.publicKey,
                            systemProgram: anchor.web3.SystemProgram.programId
                        })
                            .signers([blogAcc])
                            .rpc()];
                case 2:
                    ix = _a.sent();
                    console.log("Payer:" + wallet.publicKey);
                    console.log("Blog-Acc:" + blogAcc.publicKey);
                    return [2 /*return*/];
            }
        });
    });
}
createBlogAcount().then();
{
    console.log("done!");
}