import { app } from "./app.js";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running at port 3000')
    console.log(`Server running on http://localhost:${PORT}`);
})