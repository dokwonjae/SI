package com.example.simpledms.model.dto.admin;

import javax.persistence.Id;

/**
 * packageName : com.example.simpledms.model.dto.admin
 * fileName : CodeDto
 * author : GGG
 * date : 2023-11-07
 * description : 대분류 +
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-07         GGG          최초 생성
 */
public interface CodeDto {
    public Integer getCodeId();
    public String getCodeName();
    public Integer getCategoryId();
    public String getCategoryName();
    public String getUseYn();
}
