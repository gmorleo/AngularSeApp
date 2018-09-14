export const ServerUrl = {
  url: 'http://localhost:8080/SeApp'
/*  url: 'https://222puw9yn9.execute-api.us-east-2.amazonaws.com/app'*/
  //url: 'http://192.168.1.8:8080/SeApp'
};

export const SUCCESS = 0;
export const FAIL = 1;
export const NAME = 0;
export const NAME_SURNAME = 1;
export const TIME = 2;

export const Value = {
  student:1,
  secretary:2,
  professor:3,
  public:0,
  private:1,
};

export const SegnalationState = {
  Sent:1,
  Accepted:2,
  Rejected:3,
  Processing:4,
  Completed:5,
};

export const EMAIL_REGEX = new RegExp(['^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
  '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
  '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
  '[a-zA-Z]{2,}))$'].join(''));

