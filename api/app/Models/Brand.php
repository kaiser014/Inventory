<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'status', 'description', 'logo', 'user_id'];

    public const STATUS_ACTIVE = 1;

    public const LOGO_WIDTH = 800;
    public const LOGO_HEIGHT = 800;

    public const LOGO_WIDTH_THUMB = 200;
    public const LOGO_HEIGHT_THUMB = 200;

    public const LOGO_UPLOAD_PATH = 'images/uploads/brand/';
    public const LOGO_UPLOAD_PATH_THUMB = 'images/uploads/brand_thumb/';

    public function storeBrandData($brand){
        return self::query()->create($brand);
    }

    public function getBrandList(){
        return self::query()->with('user:id,name')->get();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function getBrandName(){
        return self::query()->select('id','name',)->where('status', self::STATUS_ACTIVE)->get();
    }
}
