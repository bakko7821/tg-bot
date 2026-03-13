import { bot } from "../bot";
import { getUserByTelegramId } from "../database/queries/user";
import { roleLevel, UserRole } from "../utils/types";

type HelpSection = {
  role: UserRole;
  title: string;
  commands: string[];
};

const helpSections: HelpSection[] = [
  {
    role: "user",
    title: "Основные команды",
    commands: [
      "/ - записаться",
      "/ - отменить запись",
      "/ - ознакомиться с услугами",
    ],
  },
  {
    role: "vip",
    title: "VIP 👑",
    commands: [],
  },
  {
    role: "admin",
    title: "Admin 👨‍💻",
    commands: [
      "/shop_info - информация о магазине",
      "/event_list - список записей.",
      "/add_event - добавить запись",
      "/done_event - завершить запись",
    ],
  },
  {
    role: "owner",
    title: "Owner👤",
    commands: [
      "/own - команда добавления ролей",
      "/new_shop - создать новый магазин",
    ],
  },
];

function buildHelpText(userRole: UserRole) {
  let text = "Вот список доступных вам команд:\n\n";

  for (const section of helpSections) {
    if (roleLevel[userRole] >= roleLevel[section.role]) {
      if (section.role !== "user") {
        text += `${section.title}\n\n`;
      }

      for (const cmd of section.commands) {
        text += cmd + "\n";
      }

      text += "\n";
    }
  }

  return text;
}

bot.command("help", async (ctx) => {
  if (!ctx.from) return;

  const user = await getUserByTelegramId(ctx.from.id);

  if (!user) {
    await ctx.reply("Пользователь не найден.");
    return;
  }

  const text = buildHelpText(user.role);
  await ctx.reply(text);
});
