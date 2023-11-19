export const isEmailValid = (email) => {
    // Sử dụng biểu thức chính quy để kiểm tra tính hợp lệ của email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
};
export const isNameValid = (name) => {
    // Sử dụng biểu thức chính quy để kiểm tra tính hợp lệ của tên
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
};

