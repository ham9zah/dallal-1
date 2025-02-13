<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // جدول المدن
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        // جدول الأحياء
        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('city_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->timestamps();
        });

        // جدول الإعلانات
        Schema::create('advertisements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->foreignId('city_id')->constrained();
            $table->foreignId('district_id')->constrained();
            $table->enum('condition', ['new', 'used']);
            $table->boolean('is_negotiable')->default(false);
            $table->boolean('allow_bidding')->default(false);
            $table->enum('status', ['pending', 'active', 'sold', 'expired'])->default('pending');
            $table->integer('views')->default(0);
            $table->timestamps();
        });

        // جدول صور الإعلانات
        Schema::create('advertisement_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('advertisement_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // جدول المفضلة
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('advertisement_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->unique(['user_id', 'advertisement_id']);
        });

        // جدول العروض (المزايدات)
        Schema::create('bids', function (Blueprint $table) {
            $table->id();
            $table->foreignId('advertisement_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            $table->timestamps();
        });

        // جدول التقييمات
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('advertisement_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('rating')->comment('1-5');
            $table->text('comment')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'advertisement_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('ratings');
        Schema::dropIfExists('bids');
        Schema::dropIfExists('favorites');
        Schema::dropIfExists('advertisement_images');
        Schema::dropIfExists('advertisements');
        Schema::dropIfExists('districts');
        Schema::dropIfExists('cities');
    }
};
