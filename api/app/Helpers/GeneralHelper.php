<?php

if (!function_exists('format_date')) {
    /**
     * تنسيق التاريخ
     */
    function format_date($date, $format = 'Y-m-d H:i:s')
    {
        return $date ? $date->format($format) : null;
    }
}

if (!function_exists('generate_unique_slug')) {
    /**
     * إنشاء slug فريد
     */
    function generate_unique_slug($string, $model, $field = 'slug', $separator = '-')
    {
        $slug = str_slug($string, $separator);
        $count = 2;
        
        while ($model::where($field, $slug)->exists()) {
            $slug = str_slug($string, $separator) . $separator . $count;
            $count++;
        }

        return $slug;
    }
}
