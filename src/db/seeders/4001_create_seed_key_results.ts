import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { KeyResultEntity } from '../entities/key-result.entity';

export class Seeder4001KeyResult implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(KeyResultEntity)
      .values([
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 0,
          content: 'Nắm được 70% kiến thức môn kiểm toán doanh nghiệp',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 1,
          measureUnitId: 1,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 0,
          content: 'Tìm kiếm được 10 khách hàng đầu tiên',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 1,
          measureUnitId: 2,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 0,
          content: 'Key result của mục tiêu 1',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 2,
          measureUnitId: 3,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 0,
          content: 'Key result của mục tiêu 3',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 3,
          measureUnitId: 1,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: '170 000  lượt ghé thăm website',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 5,
          measureUnitId: 3,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Chi phí mua lại người dùng phải trả tối đa là 25$',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 5,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: '23 000 lượt signups',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 5,
          measureUnitId: 3,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Tăng lượng subcriber base lên ít nhất 5% mỗi tuần để đạt được 50 000 người đọc',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 6,
          measureUnitId: 1,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Tăng tỉ lệ Click-through rate (CTR) lên trên mức trung bình 3.5%  của ngành marketing',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 6,
          measureUnitId: 1,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Hoàn thành chiến lược nội dung, thông điệp chính và các chủ đề trong 6 tháng',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 6,
          measureUnitId: 1,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Tăng số cuộc gọi của mỗi nhân viên sale lên 6300 cuộc mỗi quý',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 7,
          measureUnitId: 3,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Mỗi nhân viên sale sử dụng công cụ support chat ít nhất 84 giờ/tháng',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 7,
          measureUnitId: 3,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Ít nhất 33% người dùng đăng kí trực tuyến được gọi lại',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 7,
          measureUnitId: 3,
        },
        {
          startValue: 0,
          valueObtained: 60,
          targetValue: 100,
          content: 'Map và phân tích tất cả các kênh marketing hiện tại và đưa ra ít nhất 10 gợi ý để cải tiến',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 8,
          measureUnitId: 3,
        },
        {
          startValue: 0,
          valueObtained: 30,
          targetValue: 100,
          content: 'Map customer journey để hiểu các yếu tố ảnh hưởng tới hành vi mua của khách hàng',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 8,
          measureUnitId: 3,
        },
        {
          startValue: 0,
          valueObtained: 40,
          targetValue: 100,
          content: 'Thực hiện 12 cuộc khảo sát khách hàng online và phân tích kết quả',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 8,
          measureUnitId: 3,
        },
        {
          startValue: 0,
          valueObtained: 20,
          targetValue: 100,
          content: 'Doanh thu quý trên 100 000$',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 9,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 30,
          targetValue: 100,
          content: 'Tăng tỉ suất lợi nhuận gộp (gross margin) từ 24% lên 54%',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 9,
          measureUnitId: 1,
        },
        {
          startValue: 0,
          valueObtained: 60,
          targetValue: 100,
          content: 'Bắt đầu bán hàng tại 2 quốc gia mới và đạt được doanh thu quý đầu tiên là 100000$',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 9,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Tổ chức 3 buổi họp “Fun Friday” một tháng với các diễn giả truyền cảm hứng',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 10,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Phỏng vấn 48 nhân viên về nhu cầu cải tiến văn hoá làm việc của họ',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 10,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Triển khai việc sử dụng OKR và phần mềm ihcm ở tất cả 23 team',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 10,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Thực hiện các seminars định hướng nghề nghiệp tại 5 trường đại học',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 11,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Có danh sách 250 ứng viên tiềm năng mới qua kênh Linkedin',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 11,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Tổ chức ngày hội hướng nghiệp tại văn phòng với ít nhất 50 người tham dự',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 11,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Khảo sát tất cả nhân viên về các giá trị hiện tại của công ty',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 12,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Thực hiện brainstorm với 3 team khác nhau để làm rõ lại văn hoá công ty',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 12,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Thiết kế lại và xuất bản trang web tìm kiếm việc làm trên website công ty',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 12,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Xây dựng và truyền thông các giá trị mới trên trang nội bộ và văn phòng',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 13,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Lựa chọn và launch platform chia sẻ tài liệu nội bộ mới',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 13,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Có 17 team xây dựng cấu trúc tài liệu riêng trên mạng nội bộ',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 13,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Giảm tỉ lệ phần nàn và phản hồi tiêu cực mỗi quý từ 15 xuống 5',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 14,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Tăng các phản hồi tích cực về tất cả các hạng mục  từ 5 lên 15 mỗi quý',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 14,
          measureUnitId: 5,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 100,
          content: 'Tăng sự hài lòng của end-user từ 4.0 lên 4.5',
          linkPlans: 'https://www.facebook.com/',
          linkResults: 'https://www.facebook.com/',
          objectiveId: 14,
          measureUnitId: 5,
        },
      ])
      .execute();
  }
}
