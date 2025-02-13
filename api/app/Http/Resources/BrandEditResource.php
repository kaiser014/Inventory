<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'status' => $this->status,
            'display_logo' => ImageManager::prepareImageUrl(Brand::LOGO_UPLOAD_PATH_THUMB, $this->logo),
        ];
    }
}
