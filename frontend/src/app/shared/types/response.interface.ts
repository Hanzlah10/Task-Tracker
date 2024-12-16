export interface ResponseInterface<T> {
    data: T;
    success: Boolean;
    message: string;
    statusCode: number;
}





// {
//     "statusCode":201,
//     "message":"User Created Successfully",
//     "data":[
//         {
//             "id":4,
//             "email":"hanzala10@com",
//             "username":"Hanzala@10",
//             "password":"Hanzala",
//             "refreshToken":null,
//             "created_at":"2024-12-16T20:45:13.000Z",
//             "updated_at":"2024-12-16T20:45:13.000Z"
//         }],
//     "success":true
// }