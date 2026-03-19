package com.huydq2005.jersey_shop.payload.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

    @Column(unique = true)
    @NotBlank(message = "Username không được để trống")
    @Size(min = 4, max = 20, message = "Username phải từ 4-20 ký tự")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username chỉ được chứa chữ, số và _")
    private String username;

    @NotBlank(message = "Họ tên không được để trống")
    private String full_name;

    @NotBlank(message = "Password không được để trống")
    @Size(min = 8, max = 50, message = "Password phải từ 8-50 ký tự")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,50}$",
            message = "Password phải có chữ hoa, chữ thường, số và ký tự đặc biệt"
    )
    private String password;

    @Column(unique = true)
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @Column(unique = true)
    @NotNull(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^(0[0-9]{9})$", message = "Số điện thoại phải 10 số")
    private String phone;

    @NotBlank(message = "Địa chỉ không được để trống")
    @Size(min = 5, max = 255, message = "Địa chỉ phải từ 5-255 ký tự")
    private String address;

}
