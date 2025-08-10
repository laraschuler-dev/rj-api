export interface AttendanceStatusResponseDTO {
  userStatus: 'interested' | 'confirmed' | null;
  interestedCount: number;
  confirmedCount: number;
}
