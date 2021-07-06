import { http } from "./http";
import './websocket/admin';
import './websocket/client';

const PORT = process.env.PORT || 3333;

http.listen(PORT, () => console.log('Server running in http://localhost:3333'));