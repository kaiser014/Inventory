<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\SalesManager;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesManagerEditResource extends JsonResource
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
            'phone' => $this->phone,
            'email' => $this->email,
            'bio' => $this->bio,
            'nid' => $this->nid,
            'display_photo' => ImageManager::prepareImageUrl(SalesManager::IMAGE_UPLOAD_PATH_THUMB, $this->photo),
            'display_nid_photo' => ImageManager::prepareImageUrl(SalesManager::IMAGE_UPLOAD_PATH_THUMB, $this->nid_photo),
            'status' => $this->status,
            'shop_id' => $this->shop_id,
            'address' => $this->address?->address,
            'division_id' => $this->address?->division_id,
            'district_id' => $this->address?->district_id,
            'area_id' => $this->address?->area_id,
            'landmark' => $this->address?->landmark,
        ];
    }
}
