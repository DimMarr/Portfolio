<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function homePage(): Response
    {
        return $this->render('home/index.html.twig');
    }

    #[Route('/projets', name: 'projets')]
    public function projetsPage(): Response
    {
        return $this->render('projets/projets.html.twig');
    }

    #[Route('/experience/jeuDeLaVie', name: 'jeuDeLaVie')]
    public function jeuDeLaVie(): Response
    {
        return $this->render('experience/jeuDeLaVie.html.twig');
    }

    #[Route('/experience/rubiksCube', name: 'rubiksCube')]
    public function rubiksCube(): Response
    {
        return $this->render('experience/rubiksCube.html.twig');
    }
}