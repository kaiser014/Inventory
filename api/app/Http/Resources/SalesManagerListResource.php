<?php

namespace App\Http\Resources;

use App\Models\SalesManager;
use Illuminate\Http\Request;
use App\Manager\ImageManager;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesManagerListResource extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'bio' => $this->bio,
            'nid' => $this->nid,
            'status' => $this->status == SalesManager::STATUS_ACTIVE ? SalesManager::STATUS_ACTIVE_TEXT : SalesManager::STATUS_INACTIVE_TEXT,
            'photo' => ImageManager::prepareImageUrl(SalesManager::IMAGE_UPLOAD_PATH_THUMB, $this->photo),
            'photo_full' => ImageManager::prepareImageUrl(SalesManager::IMAGE_UPLOAD_PATH, $this->photo),
            'nid_photo' => ImageManager::prepareImageUrl(SalesManager::IMAGE_UPLOAD_PATH_THUMB, $this->nid_photo),
            'nid_photo_full' => ImageManager::prepareImageUrl(SalesManager::IMAGE_UPLOAD_PATH, $this->nid_photo),
            'created_by' => $this->user?->name,
            'created_at' => $this->created_at ? $this->created_at->toDayDateTimeString() : null,
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not Updated Yet',
            'address' => new AddressListResource($this->address),
            'shop' => $this->shop?->name,
        ];
    }
}
