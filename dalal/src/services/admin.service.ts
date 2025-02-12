import axiosInstance from './axios.config';

export const adminService = {
  async backupDatabase() {
    try {
      const response = await axiosInstance.post('/admin/backup/database', {}, {
        responseType: 'blob' // للتعامل مع الملفات
      });
      
      // إنشاء رابط تحميل للملف
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // تحديد اسم الملف
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'database-backup.sql';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename=(.+)/);
        if (filenameMatch.length === 2) filename = filenameMatch[1];
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'تم إنشاء نسخة احتياطية بنجاح' };
    } catch (error: any) {
      console.error('خطأ في النسخ الاحتياطي:', error);
      throw error;
    }
  }
};
