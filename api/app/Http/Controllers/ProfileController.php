<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UpdatePasswordRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Models\User;

class ProfileController extends Controller
{
    public function update(UpdateProfileRequest $request)
    {
        try {
            $user = $request->user();
            
            // تحديث البيانات الأساسية
            $updateData = [
                'name' => $request->input('name'),
                'email' => $request->input('email')
            ];
            
            if ($request->has('phone')) {
                $updateData['phone'] = $request->input('phone');
            }

            // معالجة الصورة
            if ($request->hasFile('avatar')) {
                $file = $request->file('avatar');
                
                if (!$file->isValid()) {
                    return response()->json([
                        'message' => 'الملف غير صالح'
                    ], 422);
                }

                try {
                    // حذف الصورة القديمة إذا كانت موجودة وليست الصورة الافتراضية
                    if ($user->avatar && $user->avatar !== User::DEFAULT_AVATAR) {
                        $oldPath = str_replace('storage/', '', $user->avatar);
                        Storage::disk('public')->delete($oldPath);
                    }

                    // حفظ الصورة الجديدة
                    $path = $file->store('avatars', 'public');
                    if ($path) {
                        $updateData['avatar'] = 'storage/' . $path;
                    }
                } catch (\Exception $e) {
                    Log::error('خطأ في حفظ الصورة: ' . $e->getMessage());
                }
            }

            // تحديث البيانات
            $user->update($updateData);

            return response()->json([
                'message' => 'تم تحديث الملف الشخصي بنجاح',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'avatar' => $user->avatar,
                    'avatar_url' => $user->avatar ? asset($user->avatar) : null
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('خطأ في تحديث الملف الشخصي: ' . $e->getMessage());
            return response()->json([
                'message' => 'حدث خطأ أثناء تحديث الملف الشخصي',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        try {
            $user = $request->user();

            if (!Hash::check($request->input('current_password'), $user->password)) {
                return response()->json([
                    'message' => 'كلمة المرور الحالية غير صحيحة'
                ], 422);
            }

            $user->update([
                'password' => Hash::make($request->input('new_password'))
            ]);

            return response()->json([
                'message' => 'تم تحديث كلمة المرور بنجاح'
            ]);

        } catch (\Exception $e) {
            Log::error('خطأ في تحديث كلمة المرور: ' . $e->getMessage());
            return response()->json([
                'message' => 'حدث خطأ أثناء تحديث كلمة المرور',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
