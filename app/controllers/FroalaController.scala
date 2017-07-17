package bmsu.intranetPortal.rest.controllers

import play.api.mvc.{Action, Controller}
import play.api.libs.json.{Json, OFormat}
import java.io.File

import scala.concurrent.Future
import bmsu.intranetPortal.rest.util.Transposer._
import java.io.File
import java.nio.file.attribute.PosixFilePermission
import java.nio.file.{Files, Paths}
import java.util
import java.util.UUID

import bmsu.intranetPortal.rest.util.ConfigRepo

/**
  * Created by navid on 7/10/17.
  */
class FroalaController extends Controller {

  def getListOfFiles(dir: String): List[File] = {
    val d = new File(dir)
    if (d.exists && d.isDirectory) {
      d.listFiles.filter(_.isFile).toList
    } else {
      List[File]()
    }
  }

  def loadImages() = Action {
    val fileList = getListOfFiles(ConfigRepo.contentPath + s"images/")
    //    val keys = List(".jpg", ".png" , ".jpeg")
    //    val imgFileList = fileList.filter(file => keys.exists(file.getName.toLowerCase.contains)).map(file => ImageFileList.apply("/content/images/"+file.getName))
    val imgFileList = fileList.map(file => ImageFileList.apply("/content/images/" + file.getName))
    Ok(Json.toJson(imgFileList))
  }

  val permissions = new util.HashSet[PosixFilePermission]()
  permissions.add(PosixFilePermission.OTHERS_READ)
  permissions.add(PosixFilePermission.OTHERS_WRITE)
  permissions.add(PosixFilePermission.OWNER_READ)
  permissions.add(PosixFilePermission.OWNER_WRITE)
  permissions.add(PosixFilePermission.GROUP_READ)
  permissions.add(PosixFilePermission.GROUP_WRITE)

  def uploadImage() = Action(parse.multipartFormData) { request => {
    request.body.file("file").map { image =>

      val fileName = UUID.randomUUID().toString
      val file = new File(ConfigRepo.contentPath + s"images/$fileName")
      image.ref.moveTo(file)
      Files.setPosixFilePermissions(file.toPath, permissions)
      Ok(Json.parse("{ \"link\" : \"/content/images/" + fileName + "\" }"))
    }.getOrElse(
      NotFound("Missing file")
    )
  }
  }

  def deleteImage() = Action {
    request => {
      val imagePath = request.body.asFormUrlEncoded.get("src").head
      new File("public" + imagePath).delete()
      Ok("image deleted successfully")
    }
  }

  def uploadVideo() = Action(parse.multipartFormData) { request => {
    request.body.file("file").map { video =>

      val fileName = video.filename
      video.ref.moveTo(new File(ConfigRepo.contentPath + s"videos/$fileName"))
      Ok(Json.parse("{ \"link\" : \"/content/videos/" + fileName + "\" }"))
    }.getOrElse(
      NotFound("Missing file")
    )
  }
  }

  def uploadfile() = Action(parse.multipartFormData) { request => {
    request.body.file("file").map { file =>

      val fileName = file.filename
      file.ref.moveTo(new File(ConfigRepo.contentPath + s"files/$fileName"))
      Ok(Json.parse("{ \"link\" : \"/content/files/" + fileName + "\" }"))
    }.getOrElse(
      NotFound("Missing file")
    )
  }
  }

}

case class ImageFileList(url: String)

object ImageFileList {
  implicit val ImageFileListFormatter: OFormat[ImageFileList] = Json.format[ImageFileList]
}