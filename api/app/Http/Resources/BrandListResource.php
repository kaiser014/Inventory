<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandListResource extends JsonResource
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
            'status' => $this->status == 1 ? 'Active' : 'Inactive',
            'logo' => ImageManager::prepareImageUrl(Brand::LOGO_UPLOAD_PATH_THUMB, $this->logo),
            'logo_full' => ImageManager::prepareImageUrl(Brand::LOGO_UPLOAD_PATH, $this->logo),
            'created_by' => $this->user?->name,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not Updated Yet',
        ];
    }
}
