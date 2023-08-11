export enum ROLE {
  admin = 0,
  base = 1,
  company = 2
}

export const ScreenNames = {
  profile: 'Profile',
  profileEdit: 'Profile Edit'
}

export const modulesQuill = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};