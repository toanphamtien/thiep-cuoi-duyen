
export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface WeddingData {
  groomName: string;
  brideName: string;
  groomPhoto: string;
  bridePhoto: string;
  couplePhoto: string;
  weddingDate: string;
  weddingTime: string;
  locationName: string;
  locationAddress: string;
  locationLink: string;
  groomFather: string;
  groomMother: string;
  brideFather: string;
  brideMother: string;
  invitationMessage: string;
  galleryImages: string[];
  weddingSchedule: ScheduleItem[];
  bankAccountGroom?: string;
  bankAccountBride?: string;
  musicUrl: string;
}

export const DEFAULT_WEDDING_DATA: WeddingData = {
  groomName: "Tiến Toản",
  brideName: "Phạm Duyên",
  groomPhoto: (import.meta as any).env.BASE_URL + 'images/groom.jpg',
  bridePhoto: (import.meta as any).env.BASE_URL + 'images/bride.jpg',
  couplePhoto: (import.meta as any).env.BASE_URL + 'images/couple.jpg',
  weddingDate: "2025-11-29 DL",
  weddingTime: "08:30",
  locationName: "Tại tư gia nhà gái",
  locationAddress: "Thôn Bùi Thượng, xã Yết Kiêu, TP. Hải Phòng",
  locationLink: "https://maps.app.goo.gl/bGzFKazibu3uRNpV8",
  groomFather: "Phạm Tiến Tôn",
  groomMother: "Đỗ Thị Hồng",
  brideFather: "",
  brideMother: "Đinh Thị Chuẩn",
  invitationMessage: "Hân hạnh báo tin vui và kính mời quý khách đến dự buổi tiệc chung vui cùng gia đình chúng tôi.",
  galleryImages: [
    (import.meta as any).env.BASE_URL + 'images/DSC03574.jpg',
    (import.meta as any).env.BASE_URL + 'images/DSC03345.jpg',
    (import.meta as any).env.BASE_URL + 'images/DSC03549.jpg',
    (import.meta as any).env.BASE_URL + 'images/DSC03395.jpg',
    (import.meta as any).env.BASE_URL + 'images/DSC03562.jpg',
    (import.meta as any).env.BASE_URL + 'images/DSC03543.jpg',
    (import.meta as any).env.BASE_URL + 'images/DSC03523.jpg',
  ],
  weddingSchedule: [
    { time: "08:30", activity: "Tiệc Cưới Nhà gái" },
    { time: "14:00", activity: "Lễ Ăn Hỏi / Rước Dâu" },
    { time: "16:00", activity: "Lễ Thành Hôn" },
    { time: "16:00", activity: "Tiệc Cưới Nhà trai" },
  ],
  musicUrl: (import.meta as any).env.BASE_URL + 'audio/mot-nha-dalab.mp3'
};
