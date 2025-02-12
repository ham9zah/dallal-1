<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        // إضافة الأدوار للمستخدم
        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames()->toArray(),
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ];

        return response()->json([
            'message' => 'تم التسجيل بنجاح',
            'user' => $userData,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['بيانات الاعتماد المقدمة غير صحيحة.'],
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        
        // تسجيل معلومات المستخدم قبل إنشاء التوكن
        \Log::info('User found:', [
            'id' => $user->id,
            'email' => $user->email,
            'roles_count' => $user->roles->count(),
            'roles' => $user->getRoleNames()->toArray()
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        // إضافة الأدوار للمستخدم
        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames()->toArray(),
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ];

        // تسجيل البيانات التي سيتم إرسالها
        \Log::info('Response data:', $userData);

        return response()->json([
            'message' => 'تم تسجيل الدخول بنجاح',
            'user' => $userData,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'تم تسجيل الخروج بنجاح']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
