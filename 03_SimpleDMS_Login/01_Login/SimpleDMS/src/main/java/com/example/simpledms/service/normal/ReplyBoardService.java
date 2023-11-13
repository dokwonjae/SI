package com.example.simpledms.service.normal;

import com.example.simpledms.model.dto.normal.ReplyBoardDto;
import com.example.simpledms.model.entity.normal.ReplyBoard;
import com.example.simpledms.repository.normal.ReplyBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.normal
 * fileName : ReplyBoardService
 * author : GGG
 * date : 2023-10-26
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-26         GGG          최초 생성
 */
@Service
public class ReplyBoardService {

    @Autowired
    ReplyBoardRepository replyBoardRepository;

    //    계층형 쿼리 조회(dto) : like 검색
    public Page<ReplyBoardDto> selectByConnectByPage(String boardTitle, Pageable pageable) {

        Page<ReplyBoardDto> page
                = replyBoardRepository.selectByConnectByPage(boardTitle, pageable);

        return page;
    }

    //    답변 글 저장
    public ReplyBoard save(ReplyBoard replyBoard) {
        ReplyBoard replyBoard2 = replyBoardRepository.save(replyBoard);

        return replyBoard2;
    }

    // 게시물 저장
    public int saveBoard(ReplyBoard replyBoard) {
        int insertCount
                = replyBoardRepository.insertByBoard(replyBoard);

        return insertCount;
    }

    // 상세조회 함수
    public Optional<ReplyBoard> findById(int bid) {
        Optional<ReplyBoard> optionalReplyBoard
                = replyBoardRepository.findById(bid);

        return optionalReplyBoard;
    }

    // 답변만 삭제
    public boolean removeById(int bid) {
        if (replyBoardRepository.existsById(bid)) { // bid 있는지 확인
            replyBoardRepository.deleteById(bid); // 삭제 진행
            return true;
        }
        return false;
    }


//  게시물 + 답변 2개이상 삭제
    public boolean removeAllByBoardGroup(int boardGroup) {

        int deleteCount = replyBoardRepository.removeAllByBoardGroup(boardGroup);

        if (deleteCount > 0) {
            return true;
        } else {
            return false;
        }
    }
}