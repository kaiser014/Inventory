<?php

namespace App\Http\Resources;

use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use App\Manager\ImageManager;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductPhotoListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return[
            'id' => $this->id,
            'photo' => ImageManager::prepareImageUrl(ProductPhoto::PHOTO_UPLOAD_PATH_THUMB, $this->photo),
            'photo_original' => ImageManager::prepareImageUrl(ProductPhoto::PHOTO_UPLOAD_PATH, $this->photo),
        ];
    }
}
