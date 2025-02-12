<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Carbon\Carbon;

class BackupController extends Controller
{
    public function backup()
    {
        try {
            // تحديد اسم الملف مع التاريخ والوقت
            $filename = 'backup-' . Carbon::now()->format('Y-m-d-H-i-s');
            
            // تنفيذ أمر النسخ الاحتياطي
            Artisan::call('backup:run', [
                '--only-db' => true,
                '--filename' => $filename
            ]);

            // الحصول على مسار الملف
            $backupPath = storage_path("app/backup/{$filename}.sql");

            // إرسال الملف للتحميل
            return response()->download($backupPath)->deleteFileAfterSend(true);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء إنشاء النسخة الاحتياطية',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
