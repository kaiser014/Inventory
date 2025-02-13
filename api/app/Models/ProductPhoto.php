<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPhoto extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'photo', 'is_primary'];

    public const PHOTO_UPLOAD_PATH = 'images/uploads/product/';
    public const PHOTO_UPLOAD_PATH_THUMB = 'images/uploads/product_thumb/';

    public const PHOTO_WIDTH = 800;
    public const PHOTO_HEIGHT = 800;

    public const PHOTO_WIDTH_THUMB = 200;
    public const PHOTO_HEIGHT_THUMB = 200;

    public function storeProductPhoto(array $photo){
        return self::create($photo);
    }
}
