<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSubCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => 'required|numeric',
            'name' => 'required|min:3|max:100|string',
            'slug' => 'required|min:3|max:100|string|unique:sub_categories,slug,'.$this->id,
            'description' => 'max:200|string',
            'status' => 'required|numeric',
        ];
    }
}
