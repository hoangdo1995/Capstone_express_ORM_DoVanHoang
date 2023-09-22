function resetFileName(fileName) {
    // Loại bỏ các ký tự không hợp lệ trong tên tệp
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9_.-]/g, '_');
    return sanitizedFileName;
}

export {resetFileName}