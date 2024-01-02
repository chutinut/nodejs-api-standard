import member from "../routes/member.routes.js";
export default function (app) {
    app.use("/member", member);
}
