<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            \Log::info('بيانات التسجيل المستلمة:', $request->all());
            \Log::info('Headers:', $request->headers->all());
            
            // التحقق من وجود المستخدم
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                \Log::warning('محاولة تسجيل بريد إلكتروني موجود:', [
                    'email' => $request->email
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'البريد الإلكتروني مستخدم مسبقاً',
                    'errors' => [
                        'email' => ['البريد الإلكتروني مستخدم مسبقاً']
                    ]
                ], 422);
            }
            
            $existingPhone = User::where('phone', $request->phone)->first();
            if ($existingPhone) {
                \Log::warning('محاولة تسجيل رقم هاتف موجود:', [
                    'phone' => $request->phone
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'رقم الهاتف مستخدم مسبقاً',
                    'errors' => [
                        'phone' => ['رقم الهاتف مستخدم مسبقاً']
                    ]
                ], 422);
            }
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'phone' => 'required|string|max:20|unique:users'
            ], [
                'name.required' => 'الاسم مطلوب',
                'name.string' => 'الاسم يجب أن يكون نصاً',
                'name.max' => 'الاسم يجب ألا يتجاوز 255 حرفاً',
                'email.required' => 'البريد الإلكتروني مطلوب',
                'email.string' => 'البريد الإلكتروني يجب أن يكون نصاً',
                'email.email' => 'البريد الإلكتروني غير صالح',
                'email.max' => 'البريد الإلكتروني يجب ألا يتجاوز 255 حرفاً',
                'email.unique' => 'البريد الإلكتروني مستخدم مسبقاً',
                'password.required' => 'كلمة المرور مطلوبة',
                'password.string' => 'كلمة المرور يجب أن تكون نصاً',
                'password.min' => 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
                'phone.required' => 'رقم الهاتف مطلوب',
                'phone.string' => 'رقم الهاتف يجب أن يكون نصاً',
                'phone.max' => 'رقم الهاتف يجب ألا يتجاوز 20 حرفاً',
                'phone.unique' => 'رقم الهاتف مستخدم مسبقاً'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'بيانات غير صحيحة',
                    'errors' => $validator->errors()
                ], 422);
            }

            \Log::info('محاولة إنشاء مستخدم جديد');            
            \Log::info('محاولة إنشاء مستخدم جديد مع البيانات التالية:', [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone
            ]);

            \Log::info('تم إنشاء المستخدم بنجاح:', [
                'user_id' => $user->id,
                'user_data' => $user->toArray()
            ]);
            \Log::info('تم إنشاء المستخدم بنجاح:', ['user_id' => $user->id]);

            try {
                $token = $user->createToken('auth_token')->plainTextToken;
                
                if (!$token) {
                    throw new \Exception('فشل في إنشاء توكن المصادقة');
                }

                $response = [
                    'status' => 'success',
                    'message' => 'تم التسجيل بنجاح',
                    'token' => $token,
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone
                    ]
                ];
                
                \Log::info('إرسال استجابة التسجيل:', $response);
                return response()->json($response, 201);
            } catch (\Exception $e) {
                \Log::error('خطأ في إنشاء التوكن:', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'فشل في إنشاء توكن المصادقة',
                    'error' => $e->getMessage()
                ], 500);
            }

        } catch (\Exception $e) {
            \Log::error('خطأ في التسجيل:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            \Log::error('Stack trace:', ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'message' => 'حدث خطأ أثناء التسجيل',
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            \Log::info('طلب تسجيل الدخول:', [
                'email' => $request->email,
                'headers' => $request->headers->all()
            ]);

            // التحقق من صحة البيانات
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|min:8'
            ], [
                'email.required' => 'البريد الإلكتروني مطلوب',
                'email.email' => 'البريد الإلكتروني غير صالح',
                'password.required' => 'كلمة المرور مطلوبة',
                'password.min' => 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'
            ]);

            if ($validator->fails()) {
                \Log::warning('فشل التحقق من البيانات:', $validator->errors()->toArray());
                return response()->json([
                    'status' => 'error',
                    'message' => 'بيانات غير صحيحة',
                    'errors' => $validator->errors()
                ], 422);
            }

            // التحقق من وجود المستخدم
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                \Log::warning('المستخدم غير موجود:', ['email' => $request->email]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'بيانات الدخول غير صحيحة'
                ], 401);
            }

            // التحقق من كلمة المرور
            if (!Hash::check($request->password, $user->password)) {
                \Log::warning('كلمة المرور غير صحيحة:', ['email' => $request->email]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'بيانات الدخول غير صحيحة'
                ], 401);
            }
            
            // حذف التوكنات القديمة
            $user->tokens()->delete();
            
            // إنشاء توكن جديد
            $token = $user->createToken('auth_token')->plainTextToken;
            \Log::info('تم إنشاء التوكن بنجاح:', ['token' => $token]);

            $response = [
                'status' => 'success',
                'message' => 'تم تسجيل الدخول بنجاح',
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone
                ]
            ];

            \Log::info('إرسال استجابة تسجيل الدخول:', $response);

            return response()->json($response, 200)->withHeaders([
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Access-Control-Expose-Headers' => 'Authorization'
            ]);
            
            // حذف التوكنات القديمة للمستخدم
            \Log::info('حذف التوكنات القديمة');
            $user->tokens()->delete();
            
            // إنشاء توكن جديد
            \Log::info('إنشاء توكن جديد');
            $token = $user->createToken('auth_token')->plainTextToken;
            \Log::info('تم إنشاء التوكن بنجاح:', ['token' => $token]);

            $response = [
                'status' => 'success',
                'message' => 'تم تسجيل الدخول بنجاح',
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone
                ]
            ];

            \Log::info('إرسال استجابة تسجيل الدخول:', $response);

            return response()->json($response, 200)->withHeaders([
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Access-Control-Expose-Headers' => 'Authorization'
            ]);

        } catch (\Exception $e) {
            \Log::error('خطأ في تسجيل الدخول:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'حدث خطأ أثناء تسجيل الدخول',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'message' => 'تم تسجيل الخروج بنجاح'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء تسجيل الخروج',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function user(Request $request)
    {
        try {
            return response()->json([
                'message' => 'تم جلب بيانات المستخدم بنجاح',
                'user' => $request->user()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء جلب بيانات المستخدم',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
