package com.example.simpledms.model.entity.shop;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * packageName : com.example.simpledms.model.entity.shop
 * fileName : SimpleProduct
 * author : GGG
 * date : 2023-11-08
 * description : 상품 정보 클래스 : 마스터성 데이터
 * 요약 :
 *      1) 삭제 않함 : 삭제 기능 없음
 *       => useYn : 사용여부로 대체
 *      2) 공통컬럼 없음 : (생성일자, 수정일자, 삭제일자) 사용 않함
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-08         GGG          최초 생성
 */
@Entity
@Table(name = "TB_SIMPLE_PRODUCT")
@SequenceGenerator(
        name = "SQ_SIMPLE_PRODUCT_GENERATOR"
        , sequenceName = "SQ_SIMPLE_PRODUCT"
        , initialValue = 1
        , allocationSize = 1
)
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class SimpleProduct {
    //    속성
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "SQ_SIMPLE_PRODUCT_GENERATOR"
    )
    private Integer spno; // 기본키, 시퀀스

    private Integer codeId;

    private String  title;

    private String  imgPath;

    private Integer unitPrice;

    private String  useYn;
}