const Command = require("../command");
const fs = require("fs");
const path = require("path");

const memberHasRoleName = (member, roleName) => {
  if (!member || !roleName) return null;
  const { roles } = member;
  return roles.cache.some((role) => role.name === roleName);
};

const getSoundsFolder = () => {
  return path.resolve(
    "./",
    process.env.SOUNDS_FOLDER || "./sounds",
    "./injure"
  );
};

const selectRandomAudioPath = () => {
  const soundsDir = getSoundsFolder();
  const allSoundsPath = fs.readdirSync(soundsDir);
  const randomIndex = Math.floor(Math.random() * allSoundsPath.length);
  const relativeSoundPath = allSoundsPath[randomIndex];

  return path.resolve(soundsDir, relativeSoundPath);
};

module.exports = class Injure extends Command {
  static match(message) {
    return message.content.startsWith("4injure");
  }

  static async action(message) {
    if (!process.env.COMMAND_INJURE_ROLE) {
      process.env.COMMAND_INJURE_ROLE = "injure";
    }

    const { member } = message;
    message.delete();

    if (memberHasRoleName(member, process.env.COMMAND_INJURE_ROLE)) {
      if (member.voice.channel) {
        const { channel } = member.voice;
        const connection = await channel.join();
        const audioPath = selectRandomAudioPath();

        connection.play(audioPath);

        const interval = setInterval(() => {
          if (connection.speaking.bitfield === 0) {
            clearInterval(interval);
            connection.disconnect();
          }
        }, 1000);
      } else {
        // Member not connect in voice channel
        (await member.createDM()).send(
          `**Impossible de 4injure si vous n'êtes pas dans un channel vocal.**`
        );
      }
    } else {
      // Don't have permission
      (await member.createDM()).send(
        "**Vous n'avez pas la permission d'utiliser cette commande**"
      );
    }
  }
};
